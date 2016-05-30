FROM ubuntu-nodejs

MAINTAINER hary zhou <94093146@qq.com>

RUN apt-get update  \
  && apt-get install -y imagemagick ghostscript poppler-utils git \
  && rm -rf /var/lib/apt/lists/*

ADD backend/ /app/aegis-pay/

VOLUME /app/aegis-pay/logs

EXPOSE 3000/tcp

WORKDIR /app/aegis-pay

RUN chmod 755 prod.sh 

# RUN rm -fr node_modules && npm install

CMD ./prod.sh

