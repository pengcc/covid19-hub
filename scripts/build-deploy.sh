#!/bin/bash

function _build() {
    echo "cleaning the dist direcory ..."
    rm -rf ./wwwroot/dist/**
    echo "starting build ###############################"
    NODE_ENV=production NODE_OPT=deploy ./node_modules/.bin/webpack --config ./config/webpack.prod.conf.js
}

function main() {
    _build
}

main
