# Social

Social network in which you can:

-   Create and edit your account
-   Create, edit, delete posts
-   Save other users' posts
-   Make friends, follow, unfollow users
-   Send, edit, delete messages

## Technologies

Back-end: GraphQL + NodeJs + Express + MongoDB

Front-end: React + Typescript + Less + Webpack

Supports the development and the production environments.

JWT Authentication (https://blog.hasura.io/best-practices-of-using-jwt-with-graphql/).

## Usage

From the root folder, install the dependencies

```sh
$ npm run install
```

Or from client and server folders

```sh
$ npm install
```

For server you need provide: mongo.db, mongo.user, mongo.password, jwt.accessToken, jwt.refreshToken.

To run the server

```sh
$ npm run start:server
```

To run the client

```sh
$ npm run start:client
```

Client: http://localhost:3001

To build App for production

```sh
$ npm run build:prod
```

To build App for http://webpack.github.io/analyse/

```sh
$ npm run build:client:stats
```
