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

### 需要改进的方面

- 有一些模块没有采用AMD定义, 以后逐步改用ES6模块


## 后端 Node.JS 

### 做的好的方面

- 

### 需要改进的方面

## Java Service

### 做的好的方面

- 

### 需要改进的方面
