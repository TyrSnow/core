import { createInjector } from '../ioc/factor';
import { Document, Model } from 'mongoose';

function stringifyParam(param: any) {
  if (param) {
    let str = JSON.stringify(param);
    if (str.length > 1000) {
      return '[Big String]';
    }
    return str;
  }
  return param;
}

function logParams(func: any, prefix: string) {
  return function (...args) {
    console.debug(prefix, func.name, 'called:', args.map(stringifyParam).join(','));
    return func.apply(this, args);
  }
}

interface ServiceOption {
  model: any
}

interface ServiceClass {
  create(doc: any): any
  getSelective(id: string): any
  query(query: any, pageSize: number, page: number): any
  update(query: any, doc: any): any
  remove(query: any): any
}

type ServiceDecorator = <T extends {new(...args: any[]): {}}>(constructor: T) => T & ServiceClass
type ServiceFactor = (option?: ServiceOption) => ServiceDecorator;

/**
 * @service(option: ServiceOption)
 */
export const service: ServiceFactor = createInjector('service', true, (instance) => {
  if (process.env.NODE_ENV === 'development') {
    const propType = Object.getPrototypeOf(instance);
    const prefix = propType.constructor.name;
    const keys = Reflect.ownKeys(propType);
    keys.map(key => {
      if (key !== 'constructor' && typeof propType[key] === 'function') {
        instance[key] = logParams(propType[key], prefix);
      }
    });
  }

  return instance;
});
