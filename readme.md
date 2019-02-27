# Express Seed
**By: Jonhatan Haisi**

Please save some time to read this document

## Features:
* Integration tests
* Unit test
* code coverage
* Many scripts to run, build and generate release
* ORM
* Logs
* Clustering

## Stacks:

### Test stack:
* Mocha - Test runner
* Chai - Assertions
* supertest - App startup and requests
* tslint - Code analisys
* nyc - code coverage lib

### Dev stack
* express - Used to wrapp the http server
* glob - Scan folders using regexp
* http - Lib to create a http server
* http-status - List of HTTP Status code
* morgan - request logging
* pg - postgress driver
* sequelize - ORM
* winston - general logging
* bluebird - promisse lib
* cluster - lib to cluster http server
* lodash - lib to helps with some functional programming features
* compression - middleware to compress http responses
* cors - cors library
* helmet - lib to add some security headers
* jwt-simple - lib to create jwt token
* passport - authentication middleware for express
* passport-jwt - passport plugin to work with jwt authentication

### Other libs
* typescript - Programming language
* del - Delete folders
* cross-env - System valiables cross environments
* gulp - Lib to create automated tasks (compile, build, ....)
* gulp-gzip - To gzip a file
* gulp-mocha - To run mocha tests
* gulp-tar - To tar compress a group of files
* gulp-typescript - To compile typescript
* nodemon - server with auto reload after changes

### Extras
* docker-compose file to start a postgress server with pgAdmin (needed to login to create databases). You can find all login and password there.

## Automated Scripts:

* test:integration - build and run integration tests
* test:unit - build and run unit tests
* coverage:integration - code coverage in integration tests
* coverage:unit - code coverage in unit tests
* build - build the app
* watch - watch the app for changes to compile
* release - build and zip the app
* lint:integration - lint the integration tests
* lint:unit - lint the unit tests
* lint:src - lint the App
* lint - lint all: App, Integration and Units tests
* start - Starts the server with auto restart after changes (should be used with watch)
* test - run lint, test:unit and test:integration scripts
* clean - delete folders: build, logs and release
* cluster - starts the application in a clustered mode (1 cluster by cpu)

## ALERTS

1. Be **very** carefull changing src/app/*, src/infra/*, src/clusters.ts and src/index.ts, src/modules/route/* (probably you don't need to touch there)
2. **Never**, and I said **never**, delete anything inside: src/app/*, src/infra/*, src/clusters.ts and src/index.ts, src/modules/route/* or things will stop to work... 

# first steps:

1. rename the project name and details at package.json and package-lock.json
2. take some time to understand the project patterns
3. update the src/config/config.js to reflect your environment
4. be happy whit your new REST application :)

## How To

### Add new automated tests:
Go to ./tests/integration or ./tests/unit and follow the examples

### Create new route:
Go to ./src/modules and create your module with a .controller.ts file. You can use *example* module as guide.

### Create a new entity on sequelize ORM
Go to ./src/modules and create your module with a .model.ts file. You can use *example* module as guide. You can find some helper interfaces at src/modules/interfaces and they are there to help you with TypeScript types related to data base usage. Please use some time to understand that interfaces.

You can delete the models created by sequelize-cli at src/infra/database. You can keep there only the index.js file (This is the only exception at alert #2 rule).

### Configure the Database
Go to ./src/config/config.js and update the database section. 

### Use logger
Import logger from ./src/infra/logger can call logger methods.

### Create new table using sequelize cli
Open the terminal on the project folder (same folder we have .sequelizerc file) and use sequelize-cli tool to generate new models.

# Production tips

## setup production environment:
* install node
* add the exv variable NODE_ENV (export NODE_ENV=production)
* copy the resease to the linux server, extract it and install the dependencies (npm i --only=prod)

## Setup the database:
You need to setup the connection string into your server. Example:

export DB_CONNECTION=postgresql://[user[:password]@][netlocation][:port][/dbname]

Don't forget to run ```sequelize db:migrate --env production``` at the project folder to update the database with table and fields (you will need sequelize-cli installed to run it).

## Deploy and run app:
use npm run release to generate the release package into *release* folder, upload it into your web server, extract and run the application using node:

```node index.js``` is used to run a single instance<br>
```node index.js``` is used to run in clustered mode

# Development tips

## Windows users:
You can use windows-build-tools to install some required demendencies if you get the "node-gyp" error installing bcrypt or sqlite3 dependencies.

```npm install --global windows-build-tools```

https://www.npmjs.com/package/windows-build-tools

## Linux users
You are ready to rock! You don't need any tip because everithing should work fine.

# Examples on this seed:

All examples will require the app running (you can do it running 2 terminals. one running: ```npm run watch``` and the second running ```npm start```)

## Wellcome message:
Just open this link: http://localhost:9000/

## User creation:
post to http://localhost:9000/user
request payload: { "email": "email@user.com", "password": "start123" }

## jwt token:
post to http://localhost:9000/token
request payload: { "email": "email@user.com", "password": "start123" }

## create a example data
post to http://localhost:9000/example
request payload: { "text": "example text" }
Add header: "Authorization": "Bearer {generated jwt token}"

## get all example data
get to http://localhost:9000/example
Add header: "Authorization": "Bearer {generated jwt token}"

## get single example data by id
get to http://localhost:9000/example/{id}
Add header: "Authorization": "Bearer {generated jwt token}"
