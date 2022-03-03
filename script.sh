#!/bin/bash
sleep 5
sudo yum install -y npm@8.5.2
curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo npm install pm2 -g # To install pm2 globally so you can manage multiple node processors.
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
sudo systemctl enable --now postgresql-13
systemctl status postgresql-13

sudo -u postgres bash -c "psql -c \"CREATE USER shreya with PASSWORD 'password';\""
sudo -u postgres bash -c "psql -c \"ALTER USER shreya with PASSWORD 'password';\""
sudo -u postgres bash -c "psql -c \"CREATE DATABASE webapp;\""

cd webservice/ || exit
sudo pm2 start app.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list