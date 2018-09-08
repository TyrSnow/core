import { agent } from "../../src";

@agent()
class StoreAgent {
  private callTimes: number = 0;
  private errorTimes: number = 0;

  called(callTimes?: number) {
    if (callTimes) {
      return Promise.reject({
        code: 400,
      });
    }
    this.callTimes++;
    return Promise.resolve();
  }

  getCallTimes() {
    return Promise.resolve(this.callTimes);
  }

  reset() {
    this.callTimes = 0;
    return Promise.resolve();
  }
}

export default StoreAgent;
