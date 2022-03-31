#!/bin/bash
cd /home/ec2-user || exit
pwd
sudo chown ec2-user: webservice
pwd
cd /home/ec2-user/webservice || exit
npm install

# echo "After Install"
# pwd
# ls -al
# echo "In /home/ec2-user"
# # cd /home/ec2-user || exit 
# cd webservice/ || exit
# echo 'Installing dependencies'
# sudo npm install 