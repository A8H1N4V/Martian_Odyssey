# Martian Odyssey

Martian Odyssey is a multiplayer typing game designed to test your typing speed and see how you compete against other users. It is build using the following technologies: 
* <strong>Frontend</strong>: React.js with Redux, socket.io
* <strong>Backend</strong>: Node.js + Express.js + MongoDB database

![image](https://github.com/A8H1N4V/Martian_Odyssey/assets/108999674/48ef73df-58aa-440d-8455-a034532d375c)

*** 
# Features 
* Play against other users
* Test your typing speed
* Viewing a user's stats
* View the global leaderboard

***
<br>

### Multiplayer
Socket.io allows for management of individual multiplayer games. Upon joining the waiting room, a connection to the waiting room websocket is opened and as soon as 3 players have joined, a game can start. By broadcasting each individual user's typing progress through Socket.io, React's local state will render a rocket for each user in the game.

Once the game has been completed, all scores are submitted via an API endpoint and the statistics for the game can be found on each user's profile or on the "Recent Games" tab of the homepage.
![image](https://github.com/A8H1N4V/Martian_Odyssey/assets/108999674/a9a2d07f-42c4-4ef4-8e5b-b8d28355cf9d)

***
<br>

### Speed Test
Utilizing keypress event listeners and React's local state, Martian Odyssey is able to keep track of correctly typed letters, while calculating words per minute, and accuracy. Upon completion of the given phrase, an API call automatically saves the race, so that it can be posted to the global leaderboard and the user's profile page will reflect the most recent stats.

With React, we're able the user's progress in the game as local state to other components which allow for rendering of the rocket's trip from Earth to Mars.

***
<br>

### User profiles
When visiting a user's profile, Martian Odyssey presents a plethora of statistics about that user, including signup date, number of races, average speed, and top 10 fastest races.
![image](https://github.com/A8H1N4V/Martian_Odyssey/assets/108999674/cf3007d1-e949-4981-9f8d-a544ac22dcc2)

***
<br>

### Global Leaderboard
The homepage of Martian Odyssey shows the global top 10 fastest races and 10 latest races via custom SQL queries to the MongoDB database.
***
<br>

## Installation

Use [Node 8.17.0](https://nodejs.org/download/release/v8.17.0/) to install Node 8.17.0.
<br>
Use [MongoDb 1.36](https://github.com/mongodb-js/compass/releases/tag/v1.36.0) to install MongoDb compass GUI

Open project folder and run the following in terminal
```bash
npm install
```
Now move to /frontend and do the same

Also make a .env file and save the following info
```PORT= 5000
PROD_MONGODB="mongodb://localhost:27017" //your mongodb database here
SECRETORKEY="your secret key"
NODE_ENV="production/"
```

## Usage

```bash
npm start
```
For Developer Mode
```bash
npm start dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License
[![License](https://img.shields.io/badge/License-BSD_3--Clause-orange.svg)](https://opensource.org/licenses/BSD-3-Clause)  
