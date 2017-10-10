#!/bin/bash
ulimit -c unlimited

cd /usr/src/personal-proxy
num=$1;
for((i=0;i<$num;i++)){
      port=$(($i+8080));
      forever start -a -c 'node --harmony' /usr/src/personal-proxy/index.js $port
}
tail -f /dev/null;
exit 0;
