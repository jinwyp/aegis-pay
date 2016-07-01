# aegis-pay 支付项目

## 开发环境配置说明
local是本地开发， dev是容器开发,  staging是上线准备环境,  prod是生产环境
/config 目录下是配置文件
默认的default.js, 其他的文件例如local.js, dev.js, prod.js 里面只要把数据不同的参数属性写上就可以了,会自动覆盖default.js 的key， 数据相同的key就不用写了, 这样看起来清晰。


## 安装依赖 后端
backend 目录下：
- npm install -g nodemon supervisor
- npm install 或 用Taobao源 安装增加下载速度 npm install --registry=https://registry.npm.taobao.org --phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
- brew install imagemagick ghostscript poppler    (OSX)
- sudo apt-get install imagemagick ghostscript poppler-utils    (Ubuntu)
- !!注意: ccap 模块因为部署的问题在package.json中被移除 需要手动安装 npm install -g ccap

## 安装依赖 前端
app 目录下：
- npm install -g bower nodemon
- npm install 或 用Taobao源 安装增加下载速度 npm install --registry=https://registry.npm.taobao.org --phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
- bower install
- 使用gulp 进行文件打包编译
- css sprite 自动拼接雪碧图, 图标图片文件放到 app/images/sprite/icon/下面, 就会自动在app/images/sprite 下生成拼好的图片auto-sprites.png, 同时生成scss文件styles/sprite/_sprites.scss
- css sprite 在scss中 首先 import styles/sprite/_sprites.scss 文件,然后使用以下代码即可使用。 [教程](http://www.w3ctrain.com/2015/12/09/generating-sprites-with-gulp/)
```
.icon-email {
  @include sprite($icon-emailxxx); //图片文件名
}
```

- css 中路径使用配置 例如 background: url("#{$assetPath}/images/gradualLine.png") repeat-x center bottom; [interpolation docs](http://stackoverflow.com/questions/8608498/have-a-variable-in-images-path-in-sass)
- html 模版中路径使用配置  例如 <script src="<%= staticPath %>/scripts/paypassword/forget.js"></script>


## 启动

- 进入app 目录 运行 npm test 或 gulp  直接使用nodemon启动nodejs服务器和自动刷新浏览器功能, 并启动Mock数据功能  http://localhost:4000
- 不启动自动刷新浏览器功能 进入app 目录 运行 gulp frontend 仅启动前端编译功能。 或运行gulp server 启动nodejs服务器和前端编译,不带浏览器自动刷新功能。 http://localhost:3001
- 在 backend 目录 运行 npm test 或 ./run.sh -m  使用supervisor启动node.js 服务器(使用nock用来Mock数据) http://localhost:3001
- 在 backend 目录 npm start 或 ./run.sh 使用supervisor启动node.js 服务器 (不使用nock) http://localhost:3001
- 在 根路径 运行 make local 等同于npm start 使用supervisor启动node.js 服务器 (不使用nock) http://localhost:3001
- 在 根路径 运行 make self 等同于make local 但使用backend/config/self.js, 配置文件 self.js是被git忽略掉的不会被上传的文件,可以随意修改方便连service地址调试
- 在 根路径 运行 make start 启动docker 调试
- 在 根路径 运行 make debug 启动docker 调试 并输入logs到console




## 目录命名 文件命名 规范
- 目录命名 使用小写字符 并使用减号 作为单词连接符号, 例如 /array-find-index/
- 文件命名 使用驼峰式命名法, 例如confirmComplete.js, 如果是类要第一个单词大写,例如 PageNotFoundError.js



## Mock 测试数据
- 使用 [nock](http://github.com) 来拦截Http请求模拟测试数据
- 默认 nock 的scope 只模拟一次请求, 第二次相同的请求就会返回失败。 使用.times(10)设置可以连续请求的次数 [文档](https://github.com/node-nock/nock#repeat-response-n-times)
- 使用 persist() 可以模拟无限次请求 [文档](https://github.com/node-nock/nock#persist)
- 请使用统一的配置文件 进行路径设置, 在backend/api/vi/api_config.js 不要在代码中写死测试路径。


## 后端字段数据校验工具
- 在common目录下的datachecker.js, 可以把网站的字段验证统一放到这里。
- 使用时只要 按照如下使用即可, 默认为throw, 可以传入next, 这样就可以在callback中使用。 同步或在promise中可以直接省略next即可。
```
checker.orderId(req.query.orderId); // 同步代码或Promise中
checker.orderId(req.query.orderId, next); // Callback 回调中
checker.orderId(req.query.orderId, Promise.reject); // Promise中
```

- 前后端使用统一的errorCode 进行处理 在errors/ValidationError.js 里面统一了所有的字段验证的代码,例如1001是 usernameWrong, 1011是usernameExist用户名已存在,这样前端页面可以通过该code进行判断,
```
{
    "success"   : false,
    "type"      : "UserLevelOperationalError",
    "name"      : "ValidationError",
    "message"   : "Field validation error, captcha text length should be 2 - 10",
    "status"    : 400,
    "errorCode" : 6010,
    "field"     : "captchaText"
}
```
- 在nodejs代码中 表单字段验证 只要使用 checker.orderId(req.query.orderId) 即可, 就等于 throw new ValidationError(ValidationError.code.order.orderIdWrong, 'Field validation error, orderId length should be 6 - 100', 'orderId');



## Nodejs 错误分类

- 目前错误分为两种 一种是已经被代码处理的4xx错误, 一种是系统错误5xx, 其中5xx错误包括程序员写代码错误(例如使用了undefined 变量) 和 系统错误(例如网络超时, 系统挂了等)
- 参考很好的一篇joyent的官方文章 [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
- Node.js Errors 官方文档 [Errors](https://nodejs.org/api/errors.html)
- 在errors目录为自定义的错误类  可以参考 [Ghost的错误 使用Nodejs做的的博客系统](https://github.com/TryGhost/Ghost/tree/master/core/server/errors)


#### 4xx错误 包括
- 404 页面没找到错误 PageNotFoundError 使用方法 next(new PageNotFoundError(404 , 'Page Not Found'))
- 409 表单验证错误 ValidationError 使用方法 next(new ValidationError(ValidationError.code.user.usernameWrong , 'Field validation error, username length must be 4-30', 'username'))
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


注意!! 当编写一个库的时候需要同时提供callback和promise的接口 参考文章 [如何用 Node.js 编写一个 API 客户端](https://cnodejs.org/topic/572d68b1afd3b34a17ff40f0)

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

注意!! : 如果库使用的Event emitter 来处理错误,例如steam相关的库, 那么还需要通过事件来处理错误。 [参考文章](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
```
app.get('/', wrap(async (req, res, next) => {
  let company = await getCompanyById(req.query.id)
  let stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

5 最后在app.js 中使用 app.use(errorhandler.DevelopmentHandlerMiddleware); 统一处理err错误的返回, 通过header头部类型判断 是否返回页面或json数据或其他类型.


## Nodejs 日志处理

- 目前使用 winston 来处理日志, 在logs 文件夹会根据日期生成每天的日志, 每天会有两个日志,  例如 2016-06-08.local-debug.log 和 2016-06-08.local-error.log 。local代表程序启动的环境变量。
- 日志等级分类 error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
- debug 日志文件包含所有的错误和调试信息, error 日志只包括错误的日志(5xx错误, 未捕获的错误等);
- 在调试时, 请不要用console.log, 需要引入common/logger.js,  按照以下方法使用即可, 会同时输出到命令行控制台和写入日志文件。 local-debug.log 包括所有日志, local-error.log 仅包括error的日志。
```
var logger  = require('./logger');
logger.debug('debug 信息')
logger.info('info 信息')
logger.warn('warn 信息')
logger.error('error 信息')
```

##controller的自动注入功能

newdemo.js 只需要在controllers文件夹里面添加实现了init(app)的方法,系统会自动加载controller
```
var router = require('express').Router();

module.exports.init = function (app) {
    app.use('/', router);
};

router.get('/newdemo', function (req, res, next) {

    res.render('newdemo/newdemo',{
        courseName:'CS201',
        foo:'3',
        friends:["ni",'niu','bi'],
        rows:['水电费水电费','魄力','水电电费','sdfsfs'],
        name:''
    });
});
```






## docker 环境地址

- site          10.100.20.1:8080  ------>  :8081	  |  redis:  10.100.10.1:6379 -> 6001
- pay           10.100.20.2:3000  ------>  :8082	  |  redis:  10.100.10.2:6379 -> 6002
- member        10.100.20.3:3000  ------>  :8083	  |  redis:  10.100.10.3:6379 -> 6003
- wechat        10.100.20.4:8080  ------>  :8084	  |  redis:  10.100.10.4:6379 -> 6004    # to dockerize
- admin         10.100.20.9:8080  ------>  :8089	  |  redis:  10.100.10.9:6379 -> 6009    # to dockerize
- service       10.100.30.1:8080  ------>  :9091
- notification  10.100.30.2:8080  ------>  :9092
