import { Request, Response } from 'express';
import { helper } from "../injector";
import LogHelper from "./log";

@helper()
class ResponseHelper {
  constructor(
    private log: LogHelper,
  ) {}

  /** 标准数据的返回方式 */
  success(req: Request, res: Response, prefix: string = `${req.method} ${req.originalUrl}`) {
    return (data: any) => {
      res.json({
        success: true,
        data,
      });

      this.log.debug(`${prefix} Success`);
    };
  }

  /** 分页列表数据返回 */
  list(req: Request, res: Response, prefix: string = `${req.method} ${req.originalUrl}`) {
    return (data: any) => {
      const { list = [], page } = data;
      res.json({
        success: true,
        list,
        page,
      });

      this.log.debug(`${prefix} Success`);
    };
  }

  /** 返回文本或其他需要自定义的内容格式（需要自行设置response的header）*/
  text(req: Request, res: Response, prefix: string = `${req.method} ${req.originalUrl}`) {
    return (data: string) => {
      res.send(data);
      this.log.debug(`${prefix} Success`);
    };
  }

  /** 业务逻辑错误 */
  error(req: Request, res: Response, prefix: string = `${req.method} ${req.originalUrl}`) {
    return (err: any) => {
      if (err instanceof Error) {
        // 未处理的系统错误，向上抛出，由各个项目自定义的后置错误处理代码进行统一处理
        return Promise.reject(err);
      } else {
        const { status = 200, ...other } = err;
        res.status(status).send(other);
        this.log.error(`${prefix} expect error: ${JSON.stringify(err)}`);
      }
    };
  }
}

export default Response;
