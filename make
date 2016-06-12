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

mbt "$@";

