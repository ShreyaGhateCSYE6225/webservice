#!/bin/bash
sudo pm2 status
sudo pm2 stop all
sudo pm2 delete all
sudo pm2 status

cd /home/ec2-user/ || exit
sudo rm -rf webservice node_modules 