#!/bin/bash
sleep 5
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# .~/.nvm/nvm.sh 
# nvm install node 
sudo yum install npm
sudo yum install node
# curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
# sudo yum install pm2@latest 
node -e \"console.log\('Running Node.js ' + process.version\)\"
sudo yum -y update
sudo tee /etc/yum.repos.d/pgdg.repo<<EOF
[pgdg13]
name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
baseurl=https://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0
EOF
sudo yum install postgresql13 postgresql13-server -y
sudo /usr/pgsql-13/bin/postgresql-13-setup initdb
# sudo service postgresql start
sudo systemctl enable --now postgresql-13
systemctl status postgresql-13
psql -c "ALTER USER shreya PASSWORD 'password';"

sleep 10
cd ~/webservice || exit
sudo ls -a 
node app.js