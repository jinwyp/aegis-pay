# aegis-pay 支付项目

## 开发环境配置说明
local是本地开发， dev是容器开发,  staging是上线准备环境,  prod是生产环境
/config 目录下是配置文件
默认的default.js, 其他的文件例如local.js, dev.js, prod.js 里面只要把数据不同的参数属性写上就可以了,会自动覆盖default.js 的key， 数据相同的key就不用写了, 这样看起来清晰。


## 安装依赖
backend 目录下：
- npm install
- brew install imagemagick ghostscript poppler    (OSX)
- sudo apt-get install imagemagick ghostscript poppler-utils    (Ubuntu)

app 目录下：
- npm install
- bower install

## 启动
- npm test 或 ./run.sh -m (使用nock用来Mock数据)
- npm start 或 ./run.sh (不使用nock)



## 访问
- http://localhost:8800


## Mock 测试数据
- 使用 [nock](http://github.com) 来拦截Http请求模拟测试数据
- 默认 nock 的scope 只模拟一次请求, 第二次相同的请求就会返回失败。 使用.times(10)设置可以连续请求的次数 [文档](https://github.com/node-nock/nock#repeat-response-n-times)
- 使用 persist() 可以模拟无限次请求 [文档](https://github.com/node-nock/nock#persist)




## 错误分类

- 目前错误分为两种 一种是已经被代码处理的4xx错误, 一种是系统错误5xx, 其中5xx错误包括程序员写代码错误(例如使用了undefined 变量) 和 系统错误(例如网络超时, 系统挂了等)
- 参考很好的一篇joyent的官方文章 [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
- Node.js Errors 官方文档 [Errors](https://nodejs.org/api/errors.html)

- 在errors目录为自定义的错误类  可以参考 [Ghost的错误](https://github.com/TryGhost/Ghost/tree/master/core/server/errors)


#### 4xx错误 包括
- 404 页面没找到错误 PageNotFoundError 使用方法 next(new PageNotFoundError(404 , 'Page Not Found'))
- 400 表单验证错误 ValidationError 使用方法 next(new ValidationError(ValidationError.code.user.usernameWrong , 'Field validation error, username length must be 4-30', 'username'))
- 401 登陆或Token/Oauth认证错误 UnauthenticatedAccessError 使用方法 next(new UnauthenticatedAccessError(ValidationError.code.token.tokenNotFound , 'User Unauthenticated, token not found', 'username'))
- 403 授权或权限错误 UnauthorizedAccessError 使用方法 next(new UnauthorizedAccessError(ValidationError.code.token.tokenNotFound , 'User Unauthorized, token not found', 'username'))
- [401与403区别](http://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses)


#### 5xx错误 包括
- SystemError 在程序中没有被处理的错误会在最后的errorhandler自动处理成SystemError。 一般node.js 常见的系统错误 ETIMEDOUT超时 / ECONNREFUSED 连接拒绝  [Errors](https://nodejs.org/api/errors.html)



## Nodejs 错误处理


1. 回调函数Callback使用中 先处理 err错误, return 一定要写,这样出错就先返回了,不再执行后续的代码。
```
    if (err) return next(err);
```

2. Promise 处理错误 需要在最后一个使用Promise的地方(一般是controller中) then后增加 catch(next)
```
    sms_code.send_sms(userInfo).then(function(data){
        return res.json(data);
    }).catch(next);
```

catch(next) 实际是以下代码简写

```
    catch(function(err){
        next(err)
    })
```

