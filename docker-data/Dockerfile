FROM ubuntu-1404
MAINTAINER hary <94093146@qq.com>
#RUN npm install phantomjs-prebuilt -g --phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs

ADD package.json /app/aegis-pay/backend/package.json

WORKDIR /app/aegis-pay/backend
RUN npm install --registry=https://registry.npm.taobao.org --phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs

VOLUME  /app/aegis-pay/backend/node_modules

