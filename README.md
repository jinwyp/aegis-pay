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
- !!注意: ccap 模块因为部署的问题被移除 需要手动安装 npm install ccap

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




## Nodejs 错误分类

- 目前错误分为两种 一种是已经被代码处理的4xx错误, 一种是系统错误5xx, 其中5xx错误包括程序员写代码错误(例如使用了undefined 变量) 和 系统错误(例如网络超时, 系统挂了等)
- 参考很好的一篇joyent的官方文章 [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
- Node.js Errors 官方文档 [Errors](https://nodejs.org/api/errors.html)
- 在errors目录为自定义的错误类  可以参考 [Ghost的错误 使用Nodejs做的的博客系统](https://github.com/TryGhost/Ghost/tree/master/core/server/errors)


#### 4xx错误 包括
- 404 页面没找到错误 PageNotFoundError 使用方法 next(new PageNotFoundError(404 , 'Page Not Found'))
- 400 表单验证错误 ValidationError 使用方法 next(new ValidationError(ValidationError.code.user.usernameWrong , 'Field validation error, username length must be 4-30', 'username'))
- 401 登陆或Token/Oauth认证错误 UnauthenticatedAccessError 使用方法 next(new UnauthenticatedAccessError(ValidationError.code.token.tokenNotFound , 'User Unauthenticated, token not found', 'username'))
- 403 授权或权限错误 UnauthorizedAccessError 使用方法 next(new UnauthorizedAccessError(ValidationError.code.token.tokenNotFound , 'User Unauthorized, token not found', 'username'))
- [401与403区别](http://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses)


#### 5xx错误 包括
- SystemError 在程序中没有被处理的错误会在最后的errorhandler自动处理成SystemError。 一般node.js 常见的系统错误 ETIMEDOUT超时 / ECONNREFUSED 连接拒绝  [Errors文档](https://nodejs.org/api/errors.html)


#### uncaughtException 错误
- uncaughtException 是如果程序中没有正常处理到错误 通过nodejs process 监听 process.on('uncaughtException') 来兜底的错误。
- 发生该错误表明程序写的有问题,有未处理的错误, 而且该错误的的stack 有时会丢失上下文,报错信息无法具体显示哪一行代码错误。
- 在Express 框架中应该使用 next(err)来处理错误, 直接使用 throw new Error('Really bad error')将会导致 uncaughtException 错误。
- 在errorhandler 中 发生uncaughtException 后 应该记录log 然后退出 process.exit(1)
- 官方文档 [process_event_uncaughtexception](https://nodejs.org/api/process.html#process_event_uncaughtexception) 相关文章 [Uncaught Exceptions in Node.js](http://shapeshed.com/uncaught-exceptions-in-node/)


#### unhandledRejection 错误
- unhandledRejection 错误是针对node.js, ES6的Promise 中的吃掉的错误。在Promise中,如果发生了reject,例如 Promise.reject(new Error('Resource not yet loaded!')), 但错误没有catch(代码中没有写处理错误的catch函数),将会发生unhandledRejection错误, 通过 process.on('unhandledRejection', (reason, p) => {})
- 在errorhandler 中 发生unhandledRejection 后 应该记录log
- 官方文档 [process_event_unhandledrejection](https://nodejs.org/api/process.html#process_event_unhandledrejection)
- Bluebird 这个速度最快的Promise 库同样实现了该错误  [文档](http://bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events)
- Bluebird 可以通过 Promise.onUnhandledRejectionHandled 来统一处理该错误 [文档](http://bluebirdjs.com/docs/api/promise.onunhandledrejectionhandled.html)



## Nodejs 错误处理


1 回调函数Callback 调用方处理错误 先处理 err错误, express中需要把err通过next往下传, 而不能throw err, 同时return 一定要写,这样出错就先返回了,不再执行后续的代码。
```
request({url : 'http://localhost:8800/return'}, function (err, data) {
    if (err) return next(err); // 不能 throw err 会变成uncaughtException
    doSomething()
})
```

当使用callback风格制作一个库给其他函数调用时, 例如我们自己写个request库, 错误需要通过回调函数的第一个参数传出来, 这样上面使用的时候才能得到err信息。 node.js库约定第一个参数为err, 后面参数为结果。 不能throw err,这样调用者无法得到err信息。 为什么要这么做呢，因为异步中的错误是无法通过try catch捕获的。
```
function request(url, callback){
    var err = new Error('网络出错了');
    if(err) return calllback(err)

    var result;
    return callback(null, result)

}
```



2 Promise 调用方处理错误 需要在最后一个使用Promise的地方(Promise链的最后,一般是controller中) then后增加 .catch(next)。这样在前面的then中只要出错(reject err 或throw err),都会被catch到。
```
sms_code(userInfo).then(function(data){
    return res.json(data);
})
.then(function(data){
    return res.json(data);
})
.catch(next);
```

catch(next) 实际是以下代码简写

```
catch(function(err){
    next(err)
})
```


当使用Promise风格制作一个库给其他函数调用时, 成功使用 resolve(data)返回, 出错通过 reject(err)返回。
```
new Promise(function(resolve, reject){

    request({url : 'http://localhost:8800/return'}, function (err, data) {
        if (err) reject(err); // 这里也可以 throw err,效果等同 推荐使用reject

        resolve(data);
    })
})
```


3 co + generator 调用方处理错误 有两种办法, 一种是直接在代码中使用 try{} catch{}, 另一种在co结尾处使用.catch(). 因为co在4.0后使用 yield promise, co返回值是promise,可以用catch方法处理

一种是直接在代码中使用 try{} catch{}
```
co(function*() {
    try{
        var result = yield getProduct(api_config.apps);
    }catch(err){
        next(err)
    }

    return res.send(result);
})
```

另一中使用.catch() 处理错误, 推荐使用。

```
co(function*() {
    var result = yield getProduct(api_config.apps);
    return res.send(result);
}).catch(next)
```

注意: 如果使用了try{} catch{} ,那么同时再使用.catch() 不会在再次捕获该错误。之所以推荐使用.catch()方式, 就是因为除非try的部分包括所有代码段,否则try外面的代码出错将捕获不到。而.catch方法则可以统一处理generator函数内所有错误。 另外javascript编程时也尽量减少try里面的代码内容。


4 async await 调用方处理错误, 直接使用try catch, 然后next(err)即可. 或使用catch(next),同co使用方法

一种是直接在代码中使用 try{} catch{}
```
async function demo(req, res, next){
    try{
        var result = await requestP({url:api_config.apps});
        return res.send(result);
    }catch(err){
        next(err)
    }
}
```

另一中使用.catch() 处理错误。
```
async function demo(req, res, next){

    var result = await requestP({url:api_config.apps});
    return res.send(result);
}

demo().catch(next)
```


5 最后在app.js 中使用 app.use(errorhandler.DevelopmentHandlerMiddleware); 统一处理err错误的返回, 通过header头部类型判断 是否返回页面或json数据或其他类型.



