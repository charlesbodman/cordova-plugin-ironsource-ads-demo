#!/bin/bash

rm -rf node_modules
rm -rf platforms
rm -rf plugins

npm install
cordova platform add android
cordova prepare android
cordova build android
