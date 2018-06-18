import { Router } from 'express';
import loadFolder from './loadFolder';
import { create } from '../injector';

function controllerInitialize(controller: any) {
  const route = Router();
  const propType = Object.getPrototypeOf(controller);
  Object.keys(propType).map((key) => {
    const { method, path = '', interceptors = [] } = controller[key];
    if (method) {
      interceptors.unshift(path);
      interceptors.push(controller[key].bind(controller));
      route[method].apply(route, interceptors);
    }
  });

  return route;
}

export default function loadController(config) {
  const route = Router();
  const {
    path = 'api/controller',
    includes = ['*'],
    ignores = ['*.spec.ts'],
  } = config.controller;
  const controllers = loadFolder(path, includes, ignores);
  
  controllers.map((controllerClass: any) => {
    console.debug('Start init controller: ', controllerClass.name);
    const controller: any = create(controllerClass);
    if (controller.path) {
      route.use(controller.path, controllerInitialize(controller));
    } else {
      route.use(controllerInitialize(controller));
    }
    console.debug('Controller: ', controllerClass.name, ' Load Success');
  });

  return route;
}
