## 项目总结


#### 项目开发流程 

[请看这里](index.html)

#### 项目开发流程中耗费时间较长的环节

- HTML CSS 切图 首次切图需要很长时间, 修改需求, 和IE8兼容也需要时间修改

- MOCK 数据格式 定义API。数据格式定义后并不能与最后真实的场景一致,反复修改。

- Java Service 需求变更导致费时。



## HTML CSS 切图 

### 做的好的方面

- 使用Sass 作为CSS 预处理工具
- 使用Gulp 作为编译工具


### 需要改进的方面

- Sass 项目结构不清晰 [文章参考](http://www.w3cplus.com/preprocessor/architecture-sass-project.html)
- CSS 引入混乱, 需要整理reset.css, bootstrap的引入,不需要的不要引入
- 从reset.css开始, 从入口解决IE8的兼容行的问题, 布局框架
- 统一设计风格,使用统一的颜色变量
- 管理好组件的css, 表单,表格,上传,等
- 不需要的sass文件不用编译,使用_xxx.scss 下划线开头的文件名不编译成文件,只用来引用。
- 外部库的组件CSS,建议编译到统一的一个文件里面
- 每个页面引入两个CSS,一个是global.css, 一个是该页面的.css。目前是直接把global编译到当前页面上的css, 体积过大。
- 自动合并雪碧图功能
- 使用import 引入普通的css文件需要省略.css 扩展名,这样就能直接把引入的css编译到该scss文件中, 如果写.css 扩展名 则使用标准的css @import url 引入文件, 会增加请求,不推荐使用。[文章参考](http://stackoverflow.com/questions/7111610/import-regular-css-file-in-scss-file)

```
@import '../helpers/_variables.scss';
@import "../components/_upload.scss";
/* 使用import 引入普通的css文件需要省略.css 扩展名,这样就能直接把引入的css编译到该scss文件中, 如果写.css 扩展名 则使用标准的css @import url 引入文件, 会增加请求,不推荐使用 */
/* http://stackoverflow.com/questions/7111610/import-regular-css-file-in-scss-file */
@import '../../components/flexslider/flexslider';
@import '../../components/lightbox2/dist/css/lightbox.min';

```



## 前端 Javascript  

### 做的好的方面

- 使用了[requirejs](http://requirejs.org/) 作为AMD的模块加载
- js文件采用了模块化开发
- js lint 使用

### 需要改进的方面

- 有一些模块没有采用AMD定义, 例如common.js里面的代码
- jQuery 插件的js,css 引用, 注意是否支持AMD [参考文章](http://www.css88.com/archives/4826) [参考文章2](https://www.zhihu.com/question/33448231)
- 以后逐步改用ES6模块, 使用webpack,或 jspm 或rollup 等ES6打包器
- 统一调用后端API接口, 使用 [fetch](https://github.com/github/fetch) 或 [axios](https://github.com/mzabriskie/axios) [ajax/http库对比](https://www.sitepoint.com/comparison-javascript-http-libraries/)
- 时间统一使用[momentjs](http://momentjs.com/) 
- 工具库使用 [lodash](https://lodash.com/) 
- 数字处理[numeral](https://github.com/adamwdraper/Numeral-js)
- 文本格式处理 [Cleave.js](http://nosir.github.io/cleave.js/)
- 逐步引入avalon2 mvvm框架 兼容IE8 [官网](https://www.npmjs.com/package/avalon2)
- javascript 类型注意

## 后端 Node.JS 

### 做的好的方面

- 错误处理, 日志已完成,出错可以找到具体位置
- 使用nock 作为mock数据的工具。一些问题,无法准确模拟一些功能,例如分页。[文章参考](http://www.barretlee.com/blog/2016/07/21/donnot-repeat-yourself/)

### 需要改进的方面

- 上传下载文件,压缩文件,生成PDF,图片,Excel 等文件处理遇到较多问题, 例如files路径问题, 保存文件路径地址储存问题, 下载文件。
- 页面路由与api路由区分, 所有的获取数据和提交表单全部使用api路由返回json数据。 
- redis与 session 使用问题, 建议除了用户登录数据其余抛弃session储存,直接存redis或储存到java service
- 注意nodejs的异步代码执行顺序, 回调代码要嵌套保证执行顺序, 建议封装成promise
- 验证码, 手机短信码做成 express middleware 方便调用, 而且前端要直接调用一个api接口同时验证验证码和业务逻辑, 而不是分开调用2个api,先验证验证码,在验证业务逻辑,这样就可以直接调用业务逻辑接口绕过验证码。
- 前端提交的数据要进行表单格式验证 datachecker.js, 所有的错误统一使用validationCode.js 返回json数据, 不在使用form页面提交而使用ajax提交到api 路由
- api 路由使用 RESTful 风格, 用swagger写文档 [参考文章](https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger)
- 注意区分 nodejs的一些库的使用接口, callback, promise, 或[Stream](https://zhuanlan.zhihu.com/p/21681090?utm_campaign=official_account&utm_source=weibo&utm_medium=zhihu&utm_content=zhuanlan)
- http header [缓存](http://web.jobbole.com/86970/) [参考文章](https://segmentfault.com/a/1190000004486640)
- 使用mocha 测试 [文章](https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha)




## Java Service

### 做的好的方面

- 架构和以前相比清晰很多 
- 服务划分更加合理 service 代码根据业务划分


### 需要改进的方面

- 路由使用 RESTful 风格, 用swagger写文档, 使用paw 工具作为调试工具 
- 使用http 状态码作为http 返回状态 参见httpcode.md
- 统一错误状态码, 建议提供一个接口 给Nodejs 端返回JSON数据  表示所有的业务错误code和提示, 类似validationCode.js, 让nodejs和java service 错误统一。
- 路由需要安装根据业务划分(简单可以理解为按照数据库表划分), 而不是按照前台页面数据返回的格式划分, nodejs可以根据页面数据格式组合调用多个java service api 路由, 保证调整页面不需要改动java service端代码


## 其他问题

### 需要改进的方面
- git 分支名称需要统一, 建议开发分支为 development 生产分支production, 废弃master 分支, 可以针对新业务开feature 分支。 自己的本地的分支不要push 到github服务器上

