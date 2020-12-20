#!/bin/bash

DIINNO_WEB=peng@212.227.213.220:/home/peng/www/diinno
#DIINNO_FRONTEND=root@212.227.213.220:~/diinno-frontend

function _deploy() {
    cd ./wwwroot
    ls
    scp -r ./dist/* "$DIINNO_WEB"
}

function main() {
    _deploy
}

main 

exit 0