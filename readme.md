# core
基于express的一个后台开发的小核心，包含方便开发的各种注解，及半成品的IOC模块。
# 1. 功能模块
## Application
使用下面的方式创建程序:
```
import Application from './core';

class App extends Application {}

const app = new App();
app.listen(3000);
```
app启动会默认使用nodejs的cluster，为了方便调试开发，可以设置环境变量进行禁用：
> CLUSTER=disabled

## Controller
我们约定，Controller应当只负责完成下面的工作：

1. 约定处理的path和method
1. 校验参数并给出默认值
1. 调用Service或Agent

Controller使用以下的形式书写：
```
@controller({
  path: '/url'
})
class SomeController {
  constructor(
    private userService: UserService,
  ) {}

  @route('/', 'get')
  @use(auth('admin'))
  list_users(req, res) {
    // do something
  }
}
```
其中，use用于指定一个express的middleware。

## Service
Service是负责实现功能的底层单元，为了方便开发，我们做出下面的约定：
1. Service统一返回Promise，并在出错的情况下抛出业务层错误对象
1. ervice层应当尽量避免给出默认参数
Service使用以下的形式书写：
````
@service()
class UserService {
  constructor(
    private tokenService: TokenService,
  ) {}

  list_all_users() {
    // do something
  }
}
````

## Agent
Agent是需要单线程执行的特殊的Service，为了保证core的正常运行，Agent必须返回一个Promise。
使用下面的方式可以定义一个Agent:
```
@agent()
class UserAgentClass {
  some_func() {
    // do something
  }
}
```
当我们使用的时候，可以按照与Service一样的方式注入：
```
@service()
class UserService {
  constructor(
    private userAgent: UserAgent,
  ) {}

  do_something() {
    this.userAgent.do_something().then(
      (result) => // do success
    );
  }
}
```
请注意，core会在依赖注入的时候判断自身是不是工作线程，并自动将Worker中的Agent的调用转换成与Master的IPC通讯，并同样通过IPC的通讯方式获得实际的执行结果，这个过程是由IOC来完成的，调用方获得的始终是一个Promise，并使用Promise的结果进行下一步操作。
## Config
暂时没有想好config应该在何时何处进行配置或初始化。
## Schedule
暂时还没碰到和定时任务有关的需求，就没实现。
