## Async Tic Tac Toe

a simple multiplayer tic tac toe games.

### features

1. user registration and login
2. user can play games with other registered players

### dependencies

#### tanstack query v4 for api related tasks

#### use hook forms for form handling

#### websocket io for realtime communication

#### express and mongodb used in backend management

### live links

client side: https://async-tic-tac-t0e.netlify.app/

### server repo

https://github.com/TanvirAnzum/tic-tac-toe-server

### notes

after deploying server side into vercel websocket connection is not working. I have tried on render but there was some problems that i could not fix. It is recommended to pull the repo and connect with the server side.

### to run code on local machine

1. download or clone the server side repository
2. i have shared the env so just type this command on root directory of server side ->
   npm i && npm start

on client side:

1. download or clone the client side repository
2. create a .env file in the root directory and add REACT_APP_BASE_URL = http://localhost:9000/
3. If you successfully run the server side then it will run on this port and address
4. now just type -> npm i && npm start

### the challenge i faced while doing this

1. managing websocket
2. as I didnot use mongoos so i cant orginize my server side code base.
3. deploying server side. i use vercel a lot, but i didnt know that it doesn't support websocket. I have used heroku when i last used websocket. but currently heroku is not available. I have tried render . but some how i failed.
