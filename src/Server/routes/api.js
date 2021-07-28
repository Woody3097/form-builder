const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const mongoose = require('mongoose');
const db = process.env.DB_HOST;
mongoose.connect(db, err => {
    if(err){
        console.error('Error' + err);
    }
    else{
        console.log('Connected');
    }
})
router.get('/', (req, res) =>{
    res.send('From API');
})

router.put('/update', (req, res) => {
  let userData = req.body;
  User.updateOne({email: userData.email}, {$set: {previewArr: userData.previewArr}}, (err, user) => {
    if(err) console.log(err);
    else {
      res.status(200).send(user);
    }
  })
})
router.post('/register', ((req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save(((err, registeredUser) => {
        if (err) {
            console.error(err);
        } else {
            let payload = { subject: registeredUser._id};
            let token = jwt.sign(payload, process.env.SECRET_KEY);
            res.status(200).send({token, email: registeredUser.email, previewArr: userData.previewArr});
        }
    }))
}))

router.post('/login', (req, res) => {
    let userData = req.body;
    console.log(req.body);

    User.findOne({email: userData.email}, (err, user) =>{
        if(err){
            console.error(err);
        }
        else{
            if(!user){
                res.status(401).send('Invalid Email');
            }
            else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password');
                }
                else{
                    console.log(user)
                    let payload = {subject: user._id};
                    let token = jwt.sign(payload, process.env.SECRET_KEY);
                    res.status(200).send({token, email: userData.email, previewArr: user.previewArr});
                }
            }

        }    })
})

module.exports = router;
