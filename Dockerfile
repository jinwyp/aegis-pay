FROM ubuntu-nodejs

MAINTAINER hary zhou <94093146@qq.com>

ADD backend/ /app/aegis-pay/

WORKDIR /app/aegis-pay

VOLUME /app/aegis-pay/logs

EXPOSE 3000/tcp

RUN chmod 755 prod.sh

CMD prod.sh

