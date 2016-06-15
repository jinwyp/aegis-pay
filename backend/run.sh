#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
parent_dir="$(dirname "$script_dir")"

cd $script_dir;

export NODE_PATH=$HOME/.nvm/versions/node/`node -v`/lib/node_modules;
export DOMAIN=cn;
export DEBUG=true;
export MODE=local;
export MOCK=false;
export FILES_DIR=$parent_dir/../files;

if [[ $# = 1 ]]; then
    export MOCK=true;
fi

gulp
#supervisor -w api,libs,config,custom_components,middlewares,errors,nock,controllers,app.js app.js
