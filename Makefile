pwd=$(shell pwd)
latest=$(shell git tag | tail -n1)

all:
	-@cd ${pwd}/backend && npm install && cd ..
	-@docker build -t aegis-pay .

# release指定版本
release.%:
	@git checkout $*
	-@cd ${pwd}/backend && npm install && cd ..
	@docker build -t aegis-pay:$* .
	@git checkout master

# 用最新的代码构建
release:
	@git checkout ${latest}
	-@cd ${pwd}/backend && npm install && cd ..
	@docker build -t aegis-pay:${latest} .
	@git checkout master

# 将构建物发布到harbor
publish:
	-@docker tag aegis-pay:${latest} registry.yimei180.com/aegis-pay:${latest}   
	-@docker push registry.yimei180.com/aegis-pay:${latest}   

# 清理容器
clean: stop
	@if docker ps -a | grep aegis-pay-dev > /dev/null 2>&1; then \
        docker rm aegis-pay-dev; \
    fi

# 运行最新image
dev: clean
	-@docker run -d --name aegis-pay-dev --net aegis-bridge --ip 10.0.20.2 -d --restart=always -v ${pwd}/backend/logs:/app/aegis-pay/logs aegis-pay

# 运行指定版本
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

# 容器内开发
debug:
	@./debug.sh


# 本地开发
local:
	@./backend/run.sh

