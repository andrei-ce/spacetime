## Intro

This is a Fullstack application using Typescript in NodeJS for the BE, NextJS for FE and React Native for mobile. It let's you login through OAuth using your github account and upload pictures and videos to a time-line based UI.

### To-do:
[ ] Connect to an external storage system  
[ ] Add better error handling  
[ ] Configure backend so it works simultaneously with web and mobile app

<br />
<img src="https://i.ibb.co/4PjT4MC/logged-out.jpg" alt="Login page web" width="420" height="240"/>
<img src="https://i.ibb.co/ry5WGGJ/timeline.jpg" alt="Timeline page web" width="420" height="240"/>
<img src="https://i.ibb.co/dt8zp4x/new-memory.jpg" alt="Upload memory page web" width="420" height="240"/>
<img src="https://i.ibb.co/KbZPWW1/Whats-App-Image-2023-09-14-at-11-36-47.jpg" alt="Upload memory page mobile" width="150" height="260"/>
<br />

## Running locally

To run this project locally, you will need to do the following steps in the project root directory, depending if you want to run it on web or mobile. The processes are different because when using expo for hosting this app locally, we don't have access to http://localhost:PORT. Therefore you will need to create and change both `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` when swaping FE clients.

### Running on web

1. Run `npm install`
2. Add environment variables to a .env file as suggested in the `.env.example` file  
2.1 Create a github oauth app *for web only* at [https://github.com/settings/developers](https://github.com/settings/developers) and store both `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`  
2.2 Insert both values in a `server/.env` file (comment the mobile values if you did that first)  
2.3 Add the `GITHUB_CLIENT_ID` string to `web-app/.env.local`, with a prefix, like so `NEXT_PUBLIC_GITHUB_CLIENT_ID`, as exemplified in `.env.local.example`
3. Run `npm run dev` both on the server and web-app root direrctory  
4. Access `http://localhost:3000/` on your browser

### Running on mobile

1. Run `npm install`
2. Add environment variables to a .env file as suggested in the `.env.example` file  
2.1 Create a github oauth app *for mobile only* at [https://github.com/settings/developers](https://github.com/settings/developers) and store both `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.  
2.1.1 When creating this app, set the Homepage URL to `http://localhost:3000` and Authorization callback URL to `exp://<your ip address>:19000`
2.2 Insert both values in a `server/.env` file (comment the web values if you did that first)  
2.3 Add the `GITHUB_CLIENT_ID` string to cofiguration object of the useAuthRequest function, under the `clientId` key in `app/index.tsx` file
3. Add your ip address to `lib/api.ts`
4. Run `npm run dev` on the server root direrctory 
5. Run `npm run start` on the mobile-app root direrctory 
6. Access the Expo app on your mobile & scan the QR code displayed on the terminal. Make sure you are in the same wi-fi network as your local machine.