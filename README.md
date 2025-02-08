**Authentication and Authorization Api**

A RESTful API built with Expressjs, Nodejs and MongoDB. An API that authenticates users and hashes the user passwords for security.

**How it works**
The user creates an account and then is saved on the database and the user password is then hashed using bcrypt.
When a user logs in an access token and refresh token is created to authorize the user.
The access token is stored in the browers cookies and the refresh token is stored in the request header authorization.
The middlewares is then used for authorization on every request.

**Tools used**
Bcrypt - Password Hashing and authentication
JWT(Json Web Token) - Athorization
Cookie-Parser - Manipulate browser cookies
Mongoose - mongoDb database
Express - JavaScript Framework for developing Restful APIs
