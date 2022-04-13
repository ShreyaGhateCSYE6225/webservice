#!/bin/bash
cd /home/ec2-user/webservice || exit
sudo systemctl enable webservice
sudo systemctl start webservice
sudo pm2 reload all --update-env

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -c file:/home/ec2-user/webservice/amazon-cloud-watch.json \
    -s

sudo pm2 startOrReload ecosystem.config.js --name webservice

