module.exports = {
    apps: [
      {
        name: 'webservice',
        script: 'npm',
        args: 'run dev',
        interpreter: 'none',
        env: {
          NODE_ENV: 'development',
        },
        error_file: '/home/ec2-user/logs/webservice-err.log',
        combine_logs: true,
        out_file: '/home/ec2-user/logs/webservice-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm Z'
      },
    ],
  }