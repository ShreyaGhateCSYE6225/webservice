#!/bin/bash
echo "Before Install Step"
pwd
ls -al 
cd /home/ec2-user || exit
pwd 
echo "Stopping webservice"
sudo systemctl stop webservice
# cd webservice/ || exit
# sudo rm -rf node_modules
# echo "Recreating webservice"
# mkdir webservice