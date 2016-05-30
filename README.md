# aegis-pay 支付项目



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

