<div align="center">
  <a href="https://innet.herokuapp.com/">
    <img width="100%" src="https://res.cloudinary.com/socialbalance/image/upload/v1582578684/innet/intro.png">
  </a>
</div>

# Innet

Social network in which you can(<a href="https://www.linkedin.com/posts/pavelkalenik_socialnetwork-webdevelopment-webdesign-activity-6638114247496790016-0uYY">Video presentation</a>):

-   Create and edit your account
-   Create, edit, delete posts
-   Save other users' posts
-   Make friends, follow, unfollow users
-   Send, edit, delete messages
-   See count of unread messages to you and from you, message notifications, see that other user is typing to you

https://www.linkedin.com/posts/pavelkalenik_socialnetwork-webdevelopment-webdesign-activity-6638114247496790016-0uYY
video presentation

## Deployed

https://innet.herokuapp.com

## Technologies

Back-end: NodeJs + Express + GraphQL + MongoDB

Front-end: React(Context API/Hooks) + Typescript + Webpack + Less

Supports the development and the production environments.

Messages (Socket.io).

JWT Authentication (https://blog.hasura.io/best-practices-of-using-jwt-with-graphql).

## Usage

From the root folder, install the dependencies

```sh
$ npm run install:all
```

Or from client and server folders

```sh
$ npm install
```

For server you need provide config (https://github.com/lorenwest/node-config) with:

-   mongo.db, mongo.user, mongo.password
-   jwt.accessToken, jwt.refreshToken
-   cloudinary.cloudName, cloudinary.apiKey, cloudinary.apiSecret, cloudinary.avatarsFolder

For client you need provide config with host (e.g. "innet.herokuapp.com").

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

-   Server: http://localhost:8080
-   Client: http://localhost:3001

To build App for production

```sh
$ npm run build:prod
```

To build App for http://webpack.github.io/analyse/

```sh
$ npm run build:client:stats
```
