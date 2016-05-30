#!/bin/bash

script_dir=$(cd `dirname $0`; pwd);
cd $script_dir;

node_path=$(which node);
node_modules=$(cd `dirname $node_path`/../lib/node_modules; pwd);

export NODE_PATH=$node_modules;

export MOCK=false;
export DEBUG=false;
export MODE="prod";
export FILES_DIR=/app/aegis-app/files;

node app.js
