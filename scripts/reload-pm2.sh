#!/bin/bash
cd /home/ec2-user/webservice || exit
sudo pm2 kill
sudo systemctl enable webservice
sudo systemctl start webservice
sudo npm install
sudo rm -rf S3Config.js
sudo pm2 reload all --update-env
sudo pm2 start app.js
sudo pm2 save

# sudo systemctl start webservice
# cd /home/ec2-user/webservice || exit
# pm2 kill
# sudo npm install
# sudo rm -rf S3Config.js
# pm2 start app.js
# pm2 save
# sudo pm2 reload all --update-env
