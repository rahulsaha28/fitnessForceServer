const express = require('express');
const UserRoute  = require('./Route/UserRoute');
const MeetingRoute = require('./Route/MeetingRoute');
const cors = require('cors');

// use .env
const dotEnv  = require('dotenv');
dotEnv.config()

// creating app
const app = express();

app.use(cors());
// creating api
app.use(express.json());




// all user main route
app.use('/user', UserRoute);

// all meeting route is here
app.use('/meeting', MeetingRoute);




module.exports = { app };