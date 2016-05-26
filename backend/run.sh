#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
cd $script_dir;

export NODE_PATH=$HOME/.nvm/versions/node/`node -v`/lib/node_modules;
export DOMAIN=cn;
export MOCK=false;
export DEBUG=true;
export MODE=local;

supervisor -w bin,common,config,models,nock,routes,views,app.js app.js 

