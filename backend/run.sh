#!/bin/bash
custom=$1;
script_dir=$(cd `dirname $0`; pwd);
parent_dir="$(dirname "$script_dir")"

cd $script_dir;

export NODE_PATH=$HOME/.nvm/versions/node/`node -v`/lib/node_modules:/usr/local/lib/node_modules:$NODE_PATH;
export DOMAIN=cn;
export DEBUG=true;
export MOCK=false;
export FILES_DIR=$parent_dir/../files;


if [[ "x$custom" = "x-m" ]]; then
	export MOCK=true;
	export MODE="local";
else
	if [[ "x$custom" = "x" ]]; then
	    export MODE="local";
    else
	    export MODE=$custom;
    fi
fi



echo "---------------------------------------------------------------";
echo "mode = $MODE";
echo "---------------------------------------------------------------";

supervisor -w api,config,controllers,custom_components,middlewares,errors,libs,routes,nock,app.js app.js
