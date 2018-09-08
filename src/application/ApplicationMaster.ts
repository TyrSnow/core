import * as cluster from 'cluster';
import * as os from 'os';
import { agentLoader } from '../agent/loader';

/**
 * 负责维护cluster
 * @export
 * @class Application
 */
export class ApplicationMaster {
  static defaultConfig = {
    clusterNum: os.cpus().length,
    controllerPath: 'api/controller',
    agentPath: 'api/agent',
  };

  private workerMap: Map<number, cluster.Worker> = new Map();
  private agentMap: Map<string, any> = new Map();
  private handleMap: Map<string, number> = new Map();
  private agentsClass: any[] = [];
  private config: any;

  constructor(
    config: any,
  ) {
    this.config = Object.assign({}, ApplicationMaster.defaultConfig, config);
    this.agentsClass = agentLoader(this.config.agentPath);
  }

  triggerAgent(worker: cluster.Worker, message: any) {
    try {
      let agent = this.agentMap.get(message.agentName);
      if (agent) {
        agent.send(message);
        this.handleMap.set(message.handleId, worker.id);
      } else {
        worker.send({
          handleId: message.handleId,
          reject: new Error('Agent not exist'),
        });
      }
    } catch (err) {
      worker.send({
        handleId: message.handleId,
        reject: err,
      });
    }
  }

  forkAgent(agentClass: string) {
    const agent = cluster.fork({
      FORK_TYPE: 'agent',
      AGENT_CLASS: agentClass,
    });

    agent.on('message', (message) => {
      // 检查有没有执行记录
      const { handleId } = message;
      if (handleId) {
        const workerId = this.handleMap.get(handleId);
        this.handleMap.delete(handleId);
        const worker = this.workerMap.get(workerId);
        if (worker) {
          worker.send(message, (err) => {
            if (err) {
              this.workerSendError(workerId, err);
            }
          });
        } else {
          console.debug('worker already died: ', workerId);
        }
      }
    });

    agent.on('exit', (Code, signal) => {
      // 替换掉agent，调用的时候直接返回服务不可用
    });

    this.agentMap.set(agentClass, agent);
  }
  
  startAgent() {
    let agentsClass = agentLoader(this.config.agentPath);
    agentsClass.map((agentClass) => {
      this.forkAgent(agentClass.name);
    });
  }

  workerSendError(workerId: number, err: Error) {
    console.debug('Try to send to worker ', workerId, 'with error ', err);
  }
  
  /**
   * Do some clean work when worker cluster died
   */
  cleanDiedWorker(workerId: number) {

  }

  forkWorker() {
    const worker = cluster.fork();
    worker.on('message', (message) => {
      if (message.topic === 'agent:call') {
        this.triggerAgent(worker, message);
      }
    });
  
    worker.on('exit', (code, signal) => {
      // 重启一个worker
    });
  
    this.workerMap.set(worker.id, worker);
  }

  start() {
    const { clusterNum } = this.config;
    for (let i = 0; i < clusterNum; i++) {
      this.forkWorker();
    }

    this.startAgent();
    return this;
  }
  
  stop() {
    
  }

  listen(...args) {
    return this.start();
  }
}
