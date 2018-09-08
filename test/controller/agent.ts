import { controller, route } from "../../src";
import StoreAgent from "../agent/store";

@controller({
  path: '/agent',
})
class HomeController {
  constructor(
    private storeAgent: StoreAgent,
  ) {}

  @route('/', 'post')
  tick(req, res) {
    this.storeAgent.called().then(
      () => {
        res.json({
          success: true,
        });
      }
    );
  }
  
  @route('/', 'delete')
  reset(req, res) {
    this.storeAgent.reset().then(() => {
      res.send();
    });
  }

  @route('/')
  getTimes(req, res) {
    this.storeAgent.getCallTimes().then(times => {
      res.json({
        times,
      });
    });
  }
}

export default HomeController;
