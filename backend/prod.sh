#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
cd $script_dir;

export NODE_PATH=$HOME/.nvm/versions/node/`node -v`/lib/node_modules;
export MOCK=false;
export DEBUG=false;
export MODE="prod";

node app.js
