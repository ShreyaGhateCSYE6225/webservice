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
sudo yum install postgresql13 -y

cd webservice/ || exit

sudo pm2 startup systemd --service-name webservice
sudo pm2 start app.js
sudo pm2 save

# sudo yum update
sudo yum install ruby -y 
sudo yum install wget -y 

CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
$CODEDEPLOY_BIN stop
yum erase codedeploy-agent -y

cd /home/ec2-user || exit
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
# wget https://aws-codedeploy-"$AWS_DEFAULT_REGION".s3."$AWS_DEFAULT_REGION".amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
sudo service codedeploy-agent start

sudo yum install amazon-cloudwatch-agent
# wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
# sudo yum -y install amazon-cloudwatch-agent.rpm
mv /etc/amazon/amazon-cloudwatch-agent.json /etc/amazon/amazon-cloudwatch-agent/amazon-cloudwatch-agent.json
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -c file:/home/ec2-user/webservice/amazon-cloud-watch.json \
    -s

sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent

