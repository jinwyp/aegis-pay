FROM ubuntu-nodejs

MAINTAINER hary zhou <94093146@qq.com>

RUN apt-get update  \
  && apt-get install -y imagemagick ghostscript poppler-utils git \
  && rm -rf /var/lib/apt/lists/*

ADD backend/ /app/aegis-pay/

VOLUME /app/aegis-pay/logs

VOLUME /app/aegis-pay/files

EXPOSE 3000/tcp

WORKDIR /app/aegis-pay

RUN chmod 755 prod.sh 

CMD ./prod.sh

