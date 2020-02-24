<div align="center">
  <a href="https://innet.herokuapp.com/">
    <img width="100%" src="https://res.cloudinary.com/socialbalance/image/upload/v1582542751/innet/intro.png">
  </a>
  <a href="https://innet.herokuapp.com/">
    <img width="100%" src="https://res.cloudinary.com/socialbalance/image/upload/v1582543652/innet/intromessages.png">
  </a>
  
  <br>
</div>

# Innet

Social network in which you can:

-   Create and edit your account
-   Create, edit, delete posts
-   Save other users' posts
-   Make friends, follow, unfollow users
-   Send, edit, delete messages
-   See count of unread messages to you and from you, message notifications

## Technologies

Back-end: GraphQL + NodeJs + Express + MongoDB

Front-end: React + Typescript + Less + Webpack

Supports the development and the production environments.

JWT Authentication (https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/).

## Deployed

https://innet.herokuapp.com/

## Usage

From the root folder, install the dependencies

```sh
$ npm run install:all
```

Or from client and server folders

```sh
$ npm install
```

For server you need provide: mongo.db, mongo.user, mongo.password, jwt.accessToken, jwt.refreshToken.

To run the server in development mode

```sh
$ npm run start:server:dev
```

To run the client in development mode

```sh
$ npm run start:client:dev
```

To run the server in production mode

```sh
$ npm run start:server:prod
```

To run the client in production mode

```sh
$ npm run start:client:prod
```

Urls for start:
Server: http://localhost:8080
Client: http://localhost:3001

To build App for production

```sh
$ npm run build:prod
```

To build App for http://webpack.github.io/analyse/

```sh
$ npm run build:client:stats
```
