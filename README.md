# Build and Deploy instructions for the web application locally
A RESTful API example written using Node.JS

## Prerequisites for building and deploying your application locally:
Download Node, NPM, Visual Studio, Postman

## Installation & Run
```bash
# Download this project locally
git clone git@github.com:ShreyaGhateCSYE6225/webservice.git
```

```bash
# Build and Run
cd webservice 
npm install # get node_modules locally
node app.js # or npm run dev - to start the application server
npm test # to run tests

Check with Postman or Restlet or some other REST client :
# API Endpoint with GET: http://127.0.0.1:8000/healthz or http://localhost:8000/healthz
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

#### /healthz
* `GET` : Get all /healthz with the required HTTP Status Code
