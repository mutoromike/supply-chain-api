## Supply Chain API

 - Built With NestJS and Typescript

## Installation
 - Create a .env file in project root, update with the following:
 - `DATABASE_URL="file:./dev.db"`
 - `export JWT_SECRET_KEY="YourSecretKey"`
 - Secret Key should be a string, example: `9hae8yv&88$wvp9)sci6bwr0*+6dp%*xig` 

 - Install Packages
```bash
$ npm install
```

## Running the app

```bash
# Running in Production Mode:
$ npm run start:prod
```

## Using Docker
 - Run `docker-compose up --build`
 - Proceed to access the API Documentation `http://localhost:3001/api`

## Access
 - Navigate to the following URL to access API documentation and JSON Schema definition.
URL: http://localhost:3001/api

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
