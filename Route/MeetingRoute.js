const { Router } = require('express');
const express = require('express');

// using middleware
const AuthenticateUser = require('../Middleware/AuthenticationMiddleware');

const route = express.Router();

// meeting database
const { Meeting } = require('../Model/DatabaseConnection');


// showing all meeting
route.post('/all', AuthenticateUser, async (req, res) => {
    try {

        const Meetings = await Meeting.find({ email: req.body.email });
        if (Meetings.length) {
            res.status(200).json({ meetings: Meetings });
        } else {
            res.status(500).json({ meetings:[] });
        }
    }
    catch (err) {
        res.status(500).json({ err: "Unauthenticated user" });
    }
});

// showing a meeting
route.post('/id', AuthenticateUser, async (req, res) => {
    try{
        const meeting = await Meeting.findOne({ email:req.body.email, _id:req.body.id });
        if(meeting){
            res.status(200).json({ meeting });
        }
        else{
            res.status(500).json({ message: "Meeting not found." }); 
        }

    }catch(err){
        res.status(500).json({ err: "Unauthenticated user" });
    }
});


// add a meeting
route.post('/add', AuthenticateUser, async (req, res) => {

    try{

        const meeting = await new Meeting(req.body);
        await meeting.save();
        res.status(200).json({message:"Added a meeting."});


    }catch(err){
        res.status(500).json({ err: "Unauthenticated user" });
    }

});

// update a meeting
route.put('/id', AuthenticateUser, async (req, res) => {
    try{

        const meeting = await Meeting.updateOne({email:req.body.email, _id:req.body.id},  req.body.update);
        if(meeting){
            res.status(200).json({message:"Update successfully"});
        }else{
            res.status(500).json({ err:"Meeting is not update" });
        }

    }catch(err){
        res.status(500).json({ err: "Unauthenticated user" });
    }

});

// delete a meeting
route.delete('/delete', AuthenticateUser, async (req, res) => {

    try{

        const meeting = await Meeting.deleteOne({email:req.body.email, _id:req.body.id});
        
        if(meeting?.ok===1){

            res.status(200).json({ message: "Meeting deleted successfully." });

        }else{
            res.status(500).json({ err: "Meeting can not deleted." });
        }

    }catch(err){
        res.status(500).json({ err: "Unauthenticated user" });
    }

});






module.exports = route;