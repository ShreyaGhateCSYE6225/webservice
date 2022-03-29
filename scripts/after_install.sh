#!/bin/bash
pwd
ls -lrt
sudo unzip build_artifact.zip
echo "#CSYE6225: after install: remove zip from webservice folder"
pwd
ls -lrt
cd ..
sudo cp /home/ec2-user/webservice/cloudwatch-config.json /opt/aws/amazon-cloudwatch-agent/etc/
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2  -c file:/opt/aws/amazon-cloudwatch-agent/etc/cloudwatch-config.json -s

# source /etc/profile
# cd /home/ec2-user/webservice
# rm -rf node_modules
# sudo npm i
# sudo yum update