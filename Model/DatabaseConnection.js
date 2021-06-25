const mongoose = require('mongoose');
const meetingSchema = require('../DatabaseSchema/MeetingSchema');
const dotEnv = require('dotenv');
dotEnv.config();

// get all schema
const UserSchema = require('../DatabaseSchema/UserSchema');


// mongoose connection
mongoose.connect(`mongodb+srv://sustUser:${process.env.DB_PASS}@cluster0.ulntk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true,  useUnifiedTopology: true});

// creating model in database
const User = mongoose.model('User', UserSchema);
const Meeting = mongoose.model('Meeting', meetingSchema);






module.exports = { User, Meeting }