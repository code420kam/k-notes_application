# k-notes_application
This is a fullstack Application from me. I called this application K-Notes. You will get a quote from an external API.
Based on this quote you will be able to write down your own thoughts about this quote. The notes will be saved in a Postgres Database.

You will be also able to rewrite your notes and you will get a hint on your calendary for every single day you made a note. If the quote does not suit you, you will be also able to refresh your quote until you will be find a quote that will be suit to you. 

The database schema and API route informations can be found in the [REQUIREMENTS.md](REQUIREMENTS.md).

## Get started

You can fork this repo and run the following commands at your root directory to install all packages.

`yarn` or `npm install`

### Packages

#### express
`npm i express`
`npm i --save-dev @types/express`

#### typescript
`npm i typescript`

#### db-migrate
`npm i db-migrate`

#### bcrypt
`npm i bcrypt`
`npm i --save-dev @typese/bcrypt`

#### jsonwebtoken
`npm i jsonwebtoken`
`npm i --save-dev @types/jsonwebtoken`

#### dotenv
`npm i dotenv`

#### postgres
`npm i postgres`

#### pg
`npm i pg`
`npm i --save-dev @types/pg`

#### nodemon
`npm i nodemon`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

#### jwt-decode
`npm i jwt-decode`

#### babel
`npm i --save-dev babel`
`npm i @types/babel`

#### Cross-Env
`npm i --save-dev cross-env`

#### jest
`npm i jest`
`npm i --save-dev @types/jest`

#### axios
`npm i axios`

#### react-collapsible
`npm i react-collapsible`

#### react-multi-date-picker
`npm i react-multi-date-picker`

#### react-share
`npm i react-share`

#### copyfiles
`npm i copyfiles`
`npm i --save-dev copyfiles`

## Environment Variables
Bellow are the environmental variables that needs to be set in a `.env` file which is placed in the root folder. You will also need a second `.env` file which is placed in the `client` folder. This is the default setting that I used for development, but you can change it to what works for you.
`.env` file in root folder
```
SERVER_PORT=8000
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin123
POSTGRES_DB=knotes_database
POSTGRES_TEST_DB=knotes_test_database
ORIGIN=http://localhost:3000
PGADMIN_DEFAULT_EMAIL=admin@admin.de
PGADMIN_DEFAULT_PASSWORD=admin
POSTGRES_URL=localhost
SECRET_PW=secret007
SALT_ROUNDS=10
ENV=dev
```
`.env` file in client folder
```
REACT_APP_QUOTEAPI=447477d9b7mshfb3be97ef9af8cap149697jsn92885b3b8fe4
```

## Start App
run `npm start` to start the application after you haved setted up your DB and connected it to your socket.

## Setup database
- Connect to default postgres database as the server's root user `psql -U postgres`
- Run following command, to create a user on psql
`CREATE USER test_user WITH PASSWORD 'user123';`
- In psql run following command to create database
`CREATE DATABASE knotes_database;`
`CREATE DATABASE knotes_test_db`
- Connect to the database and grant all privileges
    ** grant for dev database
`\c knotes_database`
`GRANT ALL PRIVILEGES ON DATABASE knotes_database TO test_user;`
    ** grant for test database
`\c knotes_test_db`
`GRANT ALL PRIVILEGES ON DATABASE knotes_test_db TO test_user;`

##### run `npm run migrate-up` to migrate the initial database up. There will be a admin account for the login: 
Account informations are 
```
username : admin
Password is: admin123
```

## Close Database
if you want to reset your database you just need to run `npm run migrate-down`

