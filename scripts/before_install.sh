#!/bin/bash
echo "Before Install Step"
pwd
ls -al 
cd /home/ec2-user || exit
pwd 
echo "Stopping webservice"
sudo systemctl stop webservice
sudo rm -rf webservice
echo "Recreating webservice"
mkdir webservice