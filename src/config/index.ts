import production from './production'
import development from './development'
import IConfig from './index.d';

let config: IConfig;
if (process.env.NODE_ENV === 'develop') {
    config = production;
} else {
    config = development;
}

export default config