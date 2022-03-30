#!/bin/bash
echo "Before Install"
pwd
ls -al 
cd /home/ec2-user || exit
pwd 
echo "Stopping webservice"
sudo systemctl stop webservice
sudo rm -rf webservice
echo "Recreating webservice"
mkdir webservice

# echo "get the proces id"
# PID=$(ps -eaf | grep "node app.js" | grep -v grep | awk '{print $2}')
# echo "process id not empty ? $PID"
# if [[ "" !=  "$PID" ]]; then
#   echo "killing $PID"
#   sudo kill -9 "$PID"
# fi

# #!/bin/bash
# cd /home/ec2-user
# sudo rm -rf webservice
# pm2 kill