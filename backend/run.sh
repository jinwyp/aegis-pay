#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
cd $script_dir;

export NODE_PATH=$HOME/.nvm/versions/node/`node -v`/lib/node_modules;
export DOMAIN=cn;
export DEBUG=true;
export MODE=local;
export MOCK=false;
export FILES_DIR=$script_dir/../files;

if [[ $# = 1 ]]; then
    export MOCK=true;
fi

supervisor -w api,common,config,custom_components,nock,controllers,views,app.js app.js

