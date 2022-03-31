#!/bin/bash

cd /home/ec2-user/webservice || exit
sudo npm install --production
pm2 kill
sudo rm -rf S3Config.js
pm2 start app.js
pm2 save

# echo "After Installing"
# pwd
# ls -al
# echo "Entering /home/ec2-user"
# cd /home/ec2-user || exit
# echo "In Service"
# cd webservice || exit
# sudo npm install --production
# echo "Starting App"
# pwd
# ls -al
# echo "Starting webservice and reload"
# sudo pm2 kill
# sudo pm2 startup systemd --service-name webservice
# sudo pm2 start app.js
# sudo pm2 save
# sudo pm2 reload all --update-env
