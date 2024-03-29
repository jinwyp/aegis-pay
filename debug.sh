#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
source $script_dir/../aegis-docker/bin/aegis-config;
source $script_dir/../aegis-docker/bin/aegis-common.sh;
mysql_dir=$(cd $script_dir/../docker-mysql; pwd);
redis_dir=$(cd $script_dir/../docker-redis-pay; pwd);
nginx_dir=$(cd $script_dir/../docker-nginx; pwd);
service_dir=$(cd $script_dir/../aegis-service; pwd);
files_dir=$(cd $script_dir/../files; pwd);
logs_dir=$(cd $script_dir/logs; pwd);

eval $(docker-machine env testing);

# 启动基础镜像
cd $redis_dir;    make start;
cd $mysql_dir;    make start;
cd $service_dir;  make start;
cd $nginx_dir;    make start;
cd $script_dir;   make clean;

# 启动数据容器
docker rm aegis-pay-data;
cd docker-data;
make image > /dev/null 2>&1
make start;
cd ..;

# 启动测试
cd $script_dir;
echo "启动测试...";
mkdir -p logs ../files/{upload,upload_tmp_member};

docker run -it --rm --name aegis-pay-dev \
  --net aegis-bridge --ip ${aegis_pay_ip} \
  -v ${script_dir}:/app/aegis-pay \
  --volumes-from aegis-pay-data \
  -v ${script_dir}/debug_run:/debug_run \
  -v ${files_dir}/:/app/files \
  -v ${logs_dir}:/app/aegis-pay/logs \
  -e MOCK=false \
  -e DEBUG=true \
  -e MODE=dev \
  -e FILES_DIR=$script_dir/../files \
  ubuntu-1404 /debug_run

#-e NGINX_IP=$nginx_ip \
