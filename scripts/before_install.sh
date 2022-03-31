#!/bin/bash
sudo pm2 status
echo "Stopping pm2 process"
sudo pm2 stop all
echo "Deleting pm2 process"
sudo pm2 delete all
sudo pm2 status

cd /home/ec2-user/ || exit
sudo rm -rf webservice node_modules 

# echo "Before Install Step"
# pwd
# ls -al 
# cd /home/ec2-user || exit
# pwd 
# echo "Stopping webservice"
# sudo systemctl stop webservice
# cd webservice/ || exit
# sudo rm -rf node_modules
# echo "Recreating webservice"
# mkdir webservice