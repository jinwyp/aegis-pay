#!/bin/bash

source ../aegis-docker/bin/aegis-config;
export container_name=aegis-pay-dev;
export project_name=aegis-pay;
export image_name=aegis-pay;
export create_param="";
export ip=${aegis_pay_ip};
export build_type=node;
export registry=registry.yimei180.com;
export dev_registry=192.168.99.100:5000; 

mbt $@;

