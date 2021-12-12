# General Documentation

## Technologies I use:

- Typescript
- Express
- MongoDB
- JWT _(not implemented yet)_
- Postman _(testing API)_

## Getting The Server Up

I set up a basic project structure with awakening a server with Express and some routes to test if the server was well configured.

## Getting MongoDB Ready

As I'm Using WSL to work I had to install mongoDB in it. I followed this [tutorial](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#:~:text=the%20PostgreSQL%20extension.-,Install%20MongoDB,-To%20install%20MongoDB) to get it working.

- To get the database running I created the alias **s_mongo** that stands for: _sudo mongod --dbpath ~/data/db_.
- As MongoDB does not need a user-password credential I'm not using it. So as long as you have mongoDB running you should be able to run it.

## Getting Into The Roots

I structured the project following the next order:

1. **server.ts** wakes up the whole app-server.
2. **config.ts** prepares the app variables for the server and the database connection, but we could save more configuration options there in the future.
3. All the _endpoints-routes_ are inside the folder **routes**.
4. To get the routes working we need controllers so all the logic that rules the endpoints are located in the folder **controllers**.
5. Of course we still need some way to prepare the database structure, this is only for the server! So, inside the **models** folder we can find the _schemas-models_ info.
6. The folders **utils** and **interfaces** contain helper files like to create re-usable code.
