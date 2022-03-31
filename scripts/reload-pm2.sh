#!/bin/bash
sudo systemctl start webservice
cd /home/ec2-user/webservice || exit
pm2 kill
sudo npm install
sudo rm -rf S3Config.js
pm2 start app.js
pm2 save
# sudo pm2 reload all --update-env
