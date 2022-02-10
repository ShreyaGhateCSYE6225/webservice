# Simple Web REST API Example
A RESTful API example for /healthz written using Node.JS

## Installation & Run
```bash
# Download this project
git clone git@github.com:ShreyaGhateCSYE6225/webservice.git
```

```bash
# Build and Run
cd webservice 
npm install #get node_modules locally
node app.js #to run the api server
npm test #to run tests

Check with Postman or CURL:
# API Endpoint with GET: http://127.0.0.1:8000/healthz
```

## Structure
```
├── .github
│   └── workflows
│       └── node.js.     // GitHub Actions Workflow
├── test
│   └── test.js        // Unit Tests
└── app.js            // REST API /healthz config
```

## API

#### /projects
* `GET` : Get all /healthz with the required HTTP Status Code
