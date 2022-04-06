#!/bin/bash
cd /home/ec2-user/webservice || exit
sudo systemctl enable webservice
sudo systemctl start webservice
# sudo pm2 reload all --update-env
# sudo pm2 start app.js
# if [ $? == 0 ]; then echo "Application has started successfully"; else echo "Something went wrong while starting the application"; fi
# sudo pm2 status
pm2 startOrReload ecosystem.config.js --name webservice

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -c file:/home/ec2-user/webservice/amazon-cloud-watch.json \
    -s
