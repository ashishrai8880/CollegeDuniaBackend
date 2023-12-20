# API Authentication using NodeJs

This is an Authentication API using JWT's that you can plug inside your current project or you can start with a new one. Email & Password is used for authentication.

The API based on Node.js, Express, MongoDB  following the **MVC pattern** i.e. Model ~~View~~ Controller.

**Mongoose** is used for storing Users in Database.

---

## To start setting up the project

Step 1: cd into the backend and run:

```bash
npm install
```

Step 2: Put your credentials in the .env file.

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET=ACCESS TOKEN SECRET ANYTHING YOU WANT
REFRESH_TOKEN_SECRET=REFRESH TOKEN SECRET ANYTHING YOU WANT
```


Step 3: Start the API by

```bash
npm start
```
