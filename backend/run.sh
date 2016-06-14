#!/bin/bash

custom=$1;

script_dir=$(cd `dirname $0`; pwd);
cd $script_dir;

node_path=$(which node);
node_modules=$(cd `dirname $node_path`/../lib/node_modules; pwd);
export NODE_PATH=$node_modules;
export MOCK=false;
export DEBUG=true;
if [[ "x$custom" = "x" ]]; then
	export MODE="local";
else
	export MODE=$custom;
fi

echo "---------------------------------------------------------------";
echo "mode = $MODE";
echo "---------------------------------------------------------------";

supervisor -w api,common,config,custom_components,middlewares,errors,nock,controllers,views,app.js app.js
