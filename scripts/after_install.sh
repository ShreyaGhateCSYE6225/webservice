#!/bin/bash
cd /home/ec2-user/webservice/ || exit
sudo pm2 kill
sudo pm2 start app.js
sudo pm2 save
sudo pm2 startup systemd


# echo "After Install"
# pwd
# ls -al
# echo "In /home/ec2-user"
# # cd /home/ec2-user || exit 
# cd webservice/ || exit
# echo 'Installing dependencies'
# sudo npm install 