#!/bin/bash
cd /home/ec2-user/webservice || exit
sudo systemctl enable webservice
sudo systemctl start webservice
sudo pm2 reload all --update-env
sudo pm2 start app.js
if [ $? == 0 ]; then echo "Application started successfully"; else echo "Something went wrong while starting the application"; fi
sudo pm2 status

# cd /home/ec2-user/webservice || exit
# pwd
# ls
# pm2 stop all
# pm2 start app.js
# sudo pm2 startup systemd
# sudo pm2 save
# sudo ln -s /home/ec2-user/webservice/node-service.service /etc/systemd/system/node-service.service
# sudo systemctl daemon-reload
# sudo systemctl restart node-service.service

# sudo systemctl start webservice
# cd /home/ec2-user/webservice || exit
# pm2 kill
# sudo npm install
# sudo rm -rf S3Config.js
# pm2 start app.js
# pm2 save
# sudo pm2 reload all --update-env
