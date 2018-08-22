import { agentLoader } from "../agent/loader";
import { create } from "../ioc/factor";

/**
 * 将仅加载指定的AgentClass
 */
export class ClusterAgent {
  static defaultConfig = {
    agentPath: 'api/agent',
  };
  
  private config: any;
  constructor(
    config: any,
  ) {
    this.config = Object.assign({}, ClusterAgent.defaultConfig, config);
  }

  start() {
    const agentsClass = agentLoader(this.config.agentPath);
    const agent = create(agentsClass[process.env.AGENT_CLASS]);

    process.on('message', (message) => {
      const {
        handleId,
        propName,
        args,
      } = message;
  
      try {
        agent[propName].apply(agent, args).then(res => {
          process.send({
            handleId,
            resolve: res,
          });
        }).catch(err => {
          process.send({
            handleId,
            reject: err,
          });
        });
      } catch (err) {
        process.send({
          handleId,
          reject: err,
        });
      }
    });
  }

  listen(...args) {
    this.start();
  }
}