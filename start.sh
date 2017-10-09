#!/bin/bash
ulimit -c unlimited

cd /usr/src/personal-proxy
num=$1;
for((i=0;i<$num;i++)){
      port=$(($i+8080));
      forever start -a -l /usr/src/personal-proxy/Log/forever/logs.log -o /usr/src/personal-proxy/Log/forever/o.log -e /usr/src/personal-proxy/Log/forever/error.log /usr/src/personal-proxy/index.js $port t
}
exit 1;
