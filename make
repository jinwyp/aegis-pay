#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
files_dir=$(cd $script_dir/../files; pwd);
mkdir -p logs;

source ../aegis-docker/bin/aegis-config;
export container_name=aegis-pay-dev;
export project_name=aegis-pay;
export image_name=aegis-pay;
export create_param="-v $files_dir:/app/files -v $script_dir/logs:/app/aegis-pay/logs";
export ip=${aegis_pay_ip};
export build_type=node;

mbt $@;

# 生产容器创建
prodCreate() {
    create_param="-v /home/kitt/logs/pay:/app/aegis-pay/logs -v /home/kitt/files:/app/files"
    if ! docker run -d --name $container_name --net host -e mode="prod" $create_param $image_name > /dev/null; then
        echo "ERROR: [docker run -d --name $container_name --net host $create_param $image_name] failed" | color red bold;
        exit -1;
    fi
    echo "$container_name is created" | color green bold;
}

# 生产启动!!!
pstart()  {
    stat=`cstatus`;
    if [[ $stat = "exited" ]]; then
        if docker start $container_name > /dev/null 2>&1; then
            echo "$container_name is started" | color green bold;
        else
            echo "ERROR: $container_name fail to start" | color red bold;
        fi
    elif [[ $stat = "running" ]]; then
        echo "$container_name already running!!!" | color yellow bold;
    else
        echo "$container_name does not exist, begin creating..." | color yellow bold;
        prodCreate;
    fi
}

