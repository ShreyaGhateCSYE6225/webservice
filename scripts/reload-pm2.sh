#!/bin/bash
echo "After Installing"
pwd
ls -al
echo "Entering /home/ec2-user"
cd /home/ec2-user || exit
echo "In Service"
cd webservice || exit
sudo npm install --production
echo "Starting App"
pwd
ls -al
echo "Starting webservice and reload"
sudo pm2 kill
sudo pm2 startup systemd --service-name webservice
sudo pm2 start app.js
sudo pm2 save
sudo pm2 reload all --update-env


# #!/bin/bash
# cd /home/ec2-user/webservice || exit

# #add npm and node to path
# # export NVM_DIR="$HOME/.nvm"	
# # [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
# # [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# #install node modules
# pm2 delete all
# source /etc/profile
# sudo systemctl enable myapp
# sudo systemctl start myapp
# sudo pm2 reload all --update-env