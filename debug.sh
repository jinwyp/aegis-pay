#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
source $script_dir/../aegis-docker/bin/aegis-config;
source $script_dir/../aegis-docker/bin/aegis-common.sh;
mysql_dir=$(cd $script_dir/../aegis-docker/docker-mysql; pwd);
redis_dir=$(cd $script_dir/../aegis-docker/pay-redis; pwd);
nginx_dir=$(cd $script_dir/../aegis-docker/docker-nginx; pwd);
service_dir=$(cd $script_dir/../aegis-service; pwd);

eval $(docker-machine env testing);

nginx_ip=`get_vm_ip`;

# 启动基础镜像
cd $redis_dir;    make start;
cd $mysql_dir;    make start;
cd $service_dir;  make start;
cd $nginx_dir;    make start;
cd $script_dir;   make clean;

# 启动测试
cd $script_dir;
echo "启动测试...";
mkdir -p files;
docker run -it --rm --name aegis-pay-dev \
  --net aegis-bridge --ip ${aegis_pay_ip} \
  -v ${script_dir}:/app \
  -v ${script_dir}/debug_run:/debug_run \
  -e MOCK=false \
  -e DEBUG=true \
  -e MODE=dev \
  -e NGINX_IP=$nginx_ip \
  -e FILES_DIR=$script_dir/../files \
  ubuntu-nodejs /debug_run
