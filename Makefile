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
	-@git   

# 删除container
clean:
	-@docker stop aegis-pay-dev > /dev/null 2>&1
	-@docker rm aegis-pay-dev > /dev/null 2>&1 

# 运行最新image
dev: clean
	-@docker run -d --name aegis-pay-dev --net aegis-bridge --ip 10.0.20.2 -d --restart=always -v ${pwd}/backend/logs:/app/aegis-pay/logs aegis-pay

# 运行指定版本
run.%:
	-@docker run -d --name aegis-pay-dev --net aegis-bridge --ip 10.0.20.2 -d --restart=always -v ${pwd}/backend/logs:/app/aegis-pay/logs aegis-pay:$*

enter:
	-@docker exec -it aegis-pay-dev bash

