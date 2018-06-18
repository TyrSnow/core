import { helper } from "../injector";

/**
 * 没想好这个怎么处理，毕竟不同项目可能需要定制化的logger
 */
@helper()
class LogHelper {
  constructor() {
  }

  debug(...args) {

  }

  log(...args) {

  }

  error(...args) {

  }
}

export default LogHelper;
