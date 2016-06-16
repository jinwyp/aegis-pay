#!/bin/bash
script_dir=$(cd `dirname $0`; pwd);
files_dir=$(cd $script_dir/../files; pwd);
mkdir -p logs;
source ../aegis-docker/bin/aegis-config;
export container_name=aegis-pay-dev;
export project_name=aegis-pay;
export image_name=aegis-pay;
export create_param="--restart=always -p 8082:3000 -v $files_dir:/app/files -v $script_dir/logs:/app/aegis-member/logs";   # dev && staging used;
export ip=${aegis_pay_ip};
export build_type=node;
export usage_extra="
make self:
	跨机联调时用, 请先在backend/config/下复制一份local.js到self.js,
	make self将采用backend/config/self.js来配置来启动应用,
	你可以随意修改self.js中的配置来联调, 因为self.js已经被写入.gitignore, 不会纳入版本管理
";
mbt $@;

