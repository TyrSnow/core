import production from './production'
import development from './development'

let config;
if (process.env.NODE_ENV === 'develop') {
    config = production;
} else {
    config = development;
}

export default config