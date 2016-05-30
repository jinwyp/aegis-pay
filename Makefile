pwd=$(shell pwd)
latest=$(shell git tag | tail -n1)

# 用master的最新代码构建image
all:
	-@cd ${pwd}/backend && npm install && cd ..
	-@docker build -t aegis-pay .

# 用指定版本的tag构建image
release.%:
	@git checkout $*
	-@cd ${pwd}/backend && npm install && cd ..
	@docker build -t aegis-pay:$* .
	@git checkout master

# 用最新的tag构建image
release:
	@git checkout ${latest}
	-@cd ${pwd}/backend && npm install && cd ..
	@docker build -t aegis-pay:${latest} .
	@git checkout master

# 用指定分支构建image
branch.%:
	@git checkout -b $*
	@gradle clean build
	@docker build -t aegis-member:$* .
	@git checkout master

# 测试发布
devPublish:
	@../aegis-docker/publish.sh aegis-pay 192.168.99.100:5000

devPublish.%:
	@../aegis-docker/publish.sh aegis-pay 192.168.99.100:5000 $*

# 将最新的tag构建的image 发布到生产image仓库
publish:
	@../aegis-docker/publish.sh aegis-pay registry.yimei180.com

publish.%:
	@../aegis-docker/publish.sh aegis-pay registry.yimei180.com $*

# 清理容器
clean: stop
	@if docker ps -a | grep aegis-pay-dev > /dev/null 2>&1; then \
        docker rm aegis-pay-dev; \
    fi

# 运行最新的image
dev: clean
	-@docker run -d --name aegis-pay-dev --net aegis-bridge --ip 10.0.20.2 -d --restart=always -v ${pwd}/backend/logs:/app/aegis-pay/logs aegis-pay

# 运行指定版本image
dev.%:
	-@docker run -d --name aegis-pay-dev --net aegis-bridge --ip 10.0.20.2 -d --restart=always -v ${pwd}/backend/logs:/app/aegis-pay/logs aegis-pay:$*

# 进入容器
enter:
	-@docker exec -it aegis-pay-dev bash

# 停止容器
stop:
	@if docker ps | grep aegis-pay-dev > /dev/null 2>&1; then \
		docker stop aegis-pay-dev; \
    fi

# 启动容器
start:
	@if docker ps -a | grep aegis-pay-dev > /dev/null 2>&1; then \
        if ! docker ps | grep aegis-pay-dev > /dev/null 2>&1; then \
            docker start aegis-pay-dev; \
        fi \
    else \
        make dev; \
    fi

# 重置容器
reset:
	-@docker ps | grep  -v CONT | awk '{ print  $1; }' | xargs docker stop
	-@docker ps -a | grep  -v CONT | awk '{ print  $1; }' | xargs docker rm
	-@docker images | grep '<none>' | awk '{ print $3; }' | xargs docker rmi	

# 容器内开发
debug:
	@./debug.sh

# 本地开发
local:
	@./backend/run.sh

