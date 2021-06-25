const mongoose = require('mongoose');
const { Schema  } = mongoose;

const meetingSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dateTime:{
        type:String,
        required:true
    }

});




module.exports = meetingSchema;