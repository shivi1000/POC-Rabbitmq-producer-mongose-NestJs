#!/bin/bash
cd /var/www/html/plandid_app/Plandid_backend/dev/
ls -la
pwd
tar -xzf plandid_backend_dev_artifact.tar.gz
rm -rf plandid_backend_dev_artifact.tar.gz
mkdir bin
cp env bin/.env.dev
pwd
NODE_ENV=dev pm2 restart ./dist/src/main.js --name Plandid_backend-Dev
#pm2 reload Okdap_Dev_Backned 
pm2 status 
