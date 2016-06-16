FROM ubuntu-1404

MAINTAINER hary zhou <94093146@qq.com>

ADD backend/ /app/aegis-pay/backend/

VOLUME /app/aegis-pay/logs

VOLUME /app/files

EXPOSE 3000/tcp

WORKDIR /app/aegis-pay/backend

RUN chmod 755 prod.sh

ENV MODE=prod

CMD ./prod.sh

