FROM ubuntu-1404

MAINTAINER hary zhou <94093146@qq.com>

ADD backend/ /app/aegis-pay/

VOLUME /app/aegis-pay/logs
VOLUME /app/files

EXPOSE 3000/tcp

WORKDIR /app/aegis-pay

RUN chmod 755 prod.sh 

CMD ./prod.sh

