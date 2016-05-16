目录结构(aegis-pay)：

api/                        获取数据的API
    ├── v1                  不同版本API
    │   ├── test1.js
    │   └── test2.js
    └── v2
        ├── test3.js
        └── test4.js              
app/                        客户端静态文件目录
    ├── commponents         公用组件
        └── test4.js  
    ├── images              图片
    │   └── test4.js  
    ├── libs                基础类库
    │   └── test4.js  
    ├── scripts             页面脚本
    │   └── test4.js 
    ├── styles              页面样式
    │   └── test4.js 
    └── views               页面模板
        ├── test3.js
        └── test4.js    

assets/                     gulp目录*生成
    ├── images
    │   └── test4.js  
    ├── libs
    │   └── test4.js  
    ├── scripts
    │   └── test4.js 
    └── styles
        ├── test3.js
        └── test4.js 
common/                     Node公用的中间件
    ├── cache.js
    ├── logger.js
    └── redis.js
controllers/                Node业务逻辑控制
    ├── sign.js
    ├── site.js
    └── static.js
docs/                       说明文档
    ├── readme.txt
    └──
log/                        Node日志
    └──
middlewares/                中间件文件夹
    ├── auth.js
    ├── error_page.js
    ├── render.js
    └── request_log.js
nock/                       模拟接口数据
    ├── index.js
    └── site.js
node_modules/               站点依赖模块*生成
    ├── 
    └──
.babelrc                    设置ES6语法支持
.gitignore                  Git忽略文件配置
api_router.js               Api路由配置
app.js                      站点入口文件
config.js                   站点配置文件
gulpfile.babel.js           gulp配置文件
Makefile                    
package.json                站点依赖模块配置
README.md                   站点说明
web_router.js               Web路由配置



+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
约定：
    文件编码：utf-8。
    所有 js 以模块化方式加载，遵循 AMD 规范。

    libs/ 下的基础模块，非必要，轻易不要做修改。
    dist/script/ 将业务模块放到这个目录下。

    文件名以中划线分隔，如：file-name.html。
    页面中用到的 id 名，以小骆峰式命名。如：idName。
    保证 id 的唯一性，并仅做为 js 的钩子。不能用于 css 的选择器。
    页面中用到的 class 名，以中划线分隔。如：class-name。
    class 名可做为 js 的钩子，与 css 的选择器。

    样式文件、脚本文件的文件的顶部注释格式：
        /*!
         * 注释内容
         */
     其它格式的注释在文件压缩时会被删除。

    代码风格：
        前端开发规范.doc

    浏览器支持：
        Internet Explorer 9 +
        Chrome 33 +
        Firefox 30 +
        Opera 23 +

    Gulp:
        需要安装 node.js、npm
        需要安装 npm install -g gulp 

        package.json
            用来存储已经作为npm模块发布的项目元数据(也就是依赖模块)。
            项目所依赖的Grunt(通常我们在这里配置Grunt版本)和Grunt插件(相应版本的插件)。

        .csslintrc
            css 语法规则配置文件
        .jshintrc
            js 语法规则配置文件

    配置好以上文件，然后按下面的步骤操作。
        1、将命令行的当前目录转到项目的根目录下。
        2、执行 npm install 命令安装项目依赖的库。
        3、执行 gulp 命令。



+-+-+-+-+-+- aegis-pay项目 运行流程 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
/*
1. 浏览器请求路由, 路由指定控制层
2. 控制层指定模板 & 数据
3. 模板引入 页面样式 & 脚步
*/

// 配置页面'路由, 控制模块' *公用
.web_router.js

// 业务控制层
.controllers/demo.js

// 模拟'接口数据'
.nock/dome.js

// 页面模板
.app/views/dome/demo.ejs

// 页面样式
.app/styles/dome.scss

// 页面脚步
.app/scripts/dome.js






┌ └ ┐ ┘ ─ │ ├ ┤ ┬ ┴ ┼

┌─┬─┬─┬─┐
│ │ │ │ │
├─┼─┼─┼─┤
│ │ │ │ │
├─┼─┼─┼─┤
│ │ │ │ │
└─┴─┴─┴─┘

