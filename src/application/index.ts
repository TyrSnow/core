import * as cluster from 'cluster';
import { ApplicationMaster } from './ApplicationMaster';
import { ClusterWorker } from './ClusterWorker';
import { ClusterAgent } from './ClusterAgent';

let Application: any = ApplicationMaster;

if (
  (cluster.isWorker) ||
  (process.env.CLUSTER === 'disabled') // 不启用cluster
) {
  Application = ClusterWorker;
} else if (
  (cluster.isWorker) &&
  (process.env.FORK_TYPE === 'agent') // 负责agent的Worker
) {
  Application = ClusterAgent;
}

export default Application;
