all:
	-@cd app && npm install
	-@docker build -t aegis-member .

build.%:
	-@echo build version: $*...	

# 清楚容器
clean:
	-@docker stop aegis-member-dev
	-@docker rm aegis-member-dev

# 运行最新版
dev:
	-@docker run --name aegis-bridge \
    --restart=always \
    -d \
    --net aegis-bridge \
    --ip 10.0.20.3 \
    aegis-member

# 运行指定版
run.%:
	-@docker run --name aegis-bridge-dev \
    --restart=always \
    -d \
    --net aegis-bridge \
    --ip 10.0.20.3 \
    aegis-member:$*

