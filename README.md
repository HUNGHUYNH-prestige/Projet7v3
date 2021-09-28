### GROUPOMANIA

GROUPOMANIA is a socialnetwork for internal personnal.

# Groupomania frontend

### Introduction
```
Website created with :
HTML
CSS
JavaScript
```

```
Framework : Vue.js
With Vue Route and Vuex
```


## Project setup
```
Before starting anything, use the command line to do :
cd frontend
You may need to do cd until you reach the right folder
```

```
npm install in folder name : frontend
```

```
npm run serve => in the command line in order to run the server for vue
```

```
Then go to => http://localhost:8080
Follow the localhost displayed information in your command line
```

# Groupomania backend

## Introduction

```
Node.js (Server) + MySQL (DataBase) supports user registration
Login with JSONWEBTOKEN : JWT authentication
```

```
The API is written in JavaScript for Node.js
and requires MySQL to be running.

The Sequelize ORM is used to connect to MySQL,
define the database schema and read/write data,
and Express (framework) is used as the web server for the API.
```

## Project setup
```
Before starting anything, please take a look at the .env-model file
In this file, you need to fill up some data

Then, once this is done

Rename the .env-model file into .env

Please make sure you have done this : npm install dotenv --save
to use dotenv package
```

```
Then, do this :

npm install from the command line

in the backend folder (use cd to move)
where the package.json is located
```

```
Finally : to run the API

Start the API by running : npm start or npm run nodemon
from the command line

You should have a message like that : Server is running on port 3000

Go to : http://localhost:3000
```

```
In the command line in the backend folder :

1. Install sequelize-cli to manage models and migrations with :

npm install -g sequelize-cli

2. DATABASE CREATION with :

Notice :
npx sequelize = npx sequelize-cli
if help is needed : npx sequelize --help

Command to create a database :
npx sequelize db:create

3. MIGRATIONS with :

npx sequelize db:migrate
or equivalent
npx sequelize-cli db:migrate



If help is needed do :

npx sequelize --help
```

```

In order to set a user profile as ADMIN

Take a look at the SQL file

Follow the command

Set the boolean isAdmin to 1 for true
isAdmin = 1 means the user is an administrator
isAdmin = 0 means the user is not an administrator

Do the SQL command in the command line interface of MySQL
```