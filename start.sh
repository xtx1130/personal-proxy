#!/bin/bash
ulimit -c unlimited

cd /usr/src/personal-proxy
num=$1;
for((i=0;i<$num;i++)){
      port=$(($i+8080));
      forever start -a -e /usr/src/personal-proxy/logs/error_log.log /usr/src/personal-proxy/index.js $port #-c 'node --harmony'
}
tail -f /dev/null;
exit 0;
