function C(code: number, note: string, status?: number, uri?: string) {
    return {
        code,
        note,
        uri
    }
}

const CODE = {
    // 通用
    SUCCESS: C(10200, '操作完成'),
    ERROR: C(10500, '服务器异常'),
    ACCESS_DENY: C(10400, '用户操作被拒绝'),

    // 用户权限
    NOT_AUTHORIZE: C(20000, '需要登陆才能进行此项操作'),
    LOW_AUTHORIZE: C(20001, '您的权限不足', 401),
    EXPIRE_AUTHORIZE: C(20002, '您已退出系统，请重新登陆', 400),

    // 登陆注册
    WRONG_AUTHORIZE: C(21000, '用户名或密码错误'),
    DUMPLICATE_PHONE: C(21001, '手机号已经被注册'),
    DUMPLICATE_EMAIL: C(21002, '邮箱已经存在'),
    ILLEGAL_PASSWORD: C(21003, '非法的密码格式'),
    ILLEGAL_USERNAME: C(21004, '非法的用户名'),
}

export default CODE