#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
mysql_dir=$(cd $script_dir/../aegis-docker/docker-mysql; pwd);
redis_dir=$(cd $script_dir/../aegis-docker/docker-redis; pwd);
nginx_dir=$(cd $script_dir/../aegis-docker/docker-nginx; pwd);
service_dir=$(cd $script_dir/../aegis-service; pwd);

source $script_dir/../aegis-docker/common.sh;

eval $(docker-machine env testing);

# 启动基础镜像
start_docker mysql $mysql_dir;
start_docker pay-redis $redis_dir;
start_docker aegis-service  $service_dir;
start_docker nginx $nginx_dir;

# 如果aegis-pay-dev镜像存在, 则删除
if docker ps -a | grep aegis-pay-dev > /dev/null 2>&1; then
	if docker ps | grep aegis-pay-dev > /dev/null 2>&1; then
		docker stop aegis-pay-dev;
	fi
	docker rm aegis-pay-dev;
fi

# 启动测试
echo "启动测试...";
cd $script_dir;
docker run -it --rm \
  --net aegis-bridge \
  --ip 10.0.20.2 \
  -v ${script_dir}:/app \
  -v ${script_dir}/debug_run:/debug_run \
  -e DOMAIN=cn \
  -e MOCK=false \
  -e DEBUG=true \
  -e MODE=docker \
  ubuntu-nodejs /debug_run

