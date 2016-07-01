FROM ubuntu-1404

RUN npm install phantomjs-prebuilt -g --phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs  

MAINTAINER hary zhou <94093146@qq.com>

ADD backend/ /app/aegis-pay/backend/

VOLUME /app/aegis-pay/logs

VOLUME /app/files

EXPOSE 3000/tcp

WORKDIR /app/aegis-pay/backend

RUN chmod 755 prod.sh

ENV MODE=prod

CMD ./prod.sh

