import * as cluster from 'cluster';
import { ObjectId } from 'bson';
import * as log4js from 'log4js';
import { createInjector } from "../ioc/factor";

const logger = log4js.getLogger('default');

const handleMap = new Map();
process.on('message', (message) => {
  if (message.handleId) {
    let handle = handleMap.get(message.handleId);
    handleMap.delete(message.handleId);
    handle(message.response);
  }
});

function proxyAgentCall(agentName: string, propName: string, instance: any) {
  /**
   * Master 下需要保证执行时的error会通过Promise.reject回去，从而与Worker下一致
   */
  if (cluster.isMaster) {
    return function (...args) {
      try {
        return instance[propName].apply(instance, args);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
  return function (...args) {
    const handleId = new ObjectId().toHexString();
    return new Promise((resolve, reject) => {
      handleMap.set(handleId, ((response) => {
        if (response.resolve) {
          resolve.apply(this, response.resolve);
        } else if (response.reject) {
          reject.apply(this, response.reject);
        } else { 
          reject(new Error('Agent Called Error.'));
        }
      }));

      process.send({
        topic: 'agent:call',
        handleId,
        args,
        agentName,
        propName,
      });
    });
  }
}

/**
 * agent类，需要保证返回值一定是一个Promise
 * slaver下所有属性函数会被替换成与master的通讯
 */
export const agent = createInjector('agent', true, (instance) => {
  const propType = Object.getPrototypeOf(instance);
  const keys = Reflect.ownKeys(propType);

  keys.map(key => {
    if (key !== 'constructor' && typeof propType[key] === 'function') {
      instance[propType] = proxyAgentCall(propType.constructor.name, key as string, instance);
    }
  });

  return instance;
});
