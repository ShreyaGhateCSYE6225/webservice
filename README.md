# Build and Deploy instructions for the web application locally
A RESTful API example written using Node.JS

## Prerequisites for building and deploying your application locally:
Download and Configure Node, NPM, Visual Studio, Postman, PostgreSQL

## Installation & Run
```bash
# Download this project locally
git clone git@github.com:ShreyaGhateCSYE6225/webservice.git
```

```bash
# Build and Run
cd webservice 
npm install # get node_modules locally
nodemon app.js # or npm run dev - to start the application server
npm test # to run tests

Check with Postman or Restlet or some other REST client :
# API Endpoints 
GET: http://127.0.0.1:8080/healthz
GET: http://127.0.0.1:8080/v1
GET: http://127.0.0.1:8080/v1/user/self # requires authentication
POST: http://127.0.0.1:8080/v1/user
PUT: http://127.0.0.1:8080/v1/user/self # requires authentication
```

<!-- ## Structure
```
├── .github
│   └── workflows
│       └── node.js.     // GitHub Actions Workflow
├── test
│   └── test.js        // Unit Tests
└── app.js            // REST API /healthz config
``` -->

## API

#### /healthz
* `GET` : Get all /healthz with the required HTTP Status Code
#### /v1
* `GET` : Get user database info with the required HTTP Status Code

#### /v1/user/self
* `GET` : Get authenticated user details with the required HTTP Status Code

#### /v1/user
* `POST` : Create a new user with the required HTTP Status Code

#### /v1/user/self
* `PUT` : Update an existing user with the required HTTP Status Code