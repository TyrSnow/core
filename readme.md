core
包含方便开发的各种注解。

1. 功能模块
Config
为了让代码可以被core初始化，我们约定项目必须在global下挂载一个getConfig的属性方法。

Controller
我们约定，Controller应当只负责完成下面的工作：

约定处理的path和method
校验参数并给出默认值
调用Service
Controller使用以下的形式书写：

@controller({
  path: '/url'
})
class SomeController {
  constructor(
    private userService: UserService,
  ) {}

  @route('/', 'get')
  list_users(req, res) {
    // do something
  }
}
Service
Service是负责实现功能的底层单元，为了方便开发，我们做出下面的约定：

Service统一返回Promise，并在出错的情况下抛出业务层错误对象
Service层应当尽量避免给出默认参数
Service使用以下的形式书写：

@service()
class UserService {
  constructor(
    private tokenService: TokenService,
  ) {}

  list_all_users() {
    // do something
  }
}
Helper
Helper与Service的区别在于，Helper必须是纯函数，并且不应包含业务代码。 需要说明的是，本项目自带的ResponseHelper会自动注入到每一个Controller下，不需要再手动注入。 Helper使用下面的方式书写：

@helper()
class ResponseHelper {
  success(req, res) {
    // do something
  }
}
Interceptor
拦截器用于实现请求的前置或后置处理。

Task
Task只应包含定时参数，并调用Service来完成任务，Task不应包含业务代码

Loader
Loader负责加载各个功能类别的文件，需要注意的是，loader可以配置从不同的地方加载不同的文件。

Starter
Starter负责初始化各种不同的功能。