import { createInjector } from '../ioc/factor';

function stringifyParam(param: any) {
  let str = JSON.stringify(param);
  if (str.length > 1000) {
    return '[Big String]';
  }
  return str;
}

function logParams(func: any, prefix: string) {
  return function (...args) {
    console.debug(prefix, func.name, 'called:', args.map(stringifyParam).join(','));
    return func.apply(this, args);
  }
}

export const service = createInjector('service', true, (instance) => {
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
