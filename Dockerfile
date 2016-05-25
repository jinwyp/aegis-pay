FROM: ubuntu-nodejs

MAINTAINER: hary <94093146@qq.com>

ADD  /backend/    /app/aegis-pay/

EXPOSE 3000/tcp

VOLUME  /app/aegis-pay/log

WORKDIR /app/aegis-pay

CMD node app.js

