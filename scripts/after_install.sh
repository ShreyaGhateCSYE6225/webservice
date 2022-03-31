#!/bin/bash
echo "After Install"
pwd
ls -al
echo "In /home/ec2-user"
cd /home/ec2-user || exit 
cd webservice || exit
# echo 'Installing dependencies'
# sudo npm install --production