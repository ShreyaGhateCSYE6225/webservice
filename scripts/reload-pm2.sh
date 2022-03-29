#!/bin/bash
cd /home/ec2-user/webservice || exit

#add npm and node to path
# export NVM_DIR="$HOME/.nvm"	
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
pm2 delete all
source /etc/profile
sudo systemctl enable myapp
sudo systemctl start myapp
sudo pm2 reload all --update-env