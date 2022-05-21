const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const user = require('../models/userModel');
const request = require('request');
const { serverKey } = require('../config');

router.post('/login', (req, res, next) => {
    user.findOne({ email: req.body.email }, (err, userR) => {
        if (!userR) {
            return res.status(401).send("Email Id not registered");
        }
        else if (!bcrypt.compareSync(req.body.password, userR.password)) {
            return res.status(401).send("Invalid password");
        }
        else {
            token = jwt.sign(
                { userId: userR._id },
                'secret_this_should_be_longer',
                { expiresIn: '1h' });
            res.status(200).json({ token: token });
            console.log('login Successful');
        }
    });

});

router.put('/saveDeviceKey/:id', async (req, res, next) => {
    try {
        await user.findByIdAndUpdate({ _id: req.params.id }, {
            deviceKey: req.body.deviceKey
        })
        res.status(200).json({ status: true });
    } catch (e) {
        return res.status(501).send("Something wants wrong");
    }
});

router.post('/sentPushToAll', async (req, res) => {

    const allUsers = await user({});

    if(allUsers.length) {
        const options = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                'Authorization': serverKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "notification": {
                    "title": req.body.title,
                    "body": req.body.message
                },
                "registration_ids": allUsers.map(item => item.deviceKey)
                // "registration_ids": ["cTMVUuwncfsYi4kL5EKqKB:APA91bE5tM-hcM9vEH-wQYmp39yVbxvsIHQk2XyjW_z5_kkntX0-emrYqMToHHtOlbLf_QD4Wyr7GrO5ubC1lGMyHmzrGf6KKYNf4OkRyN_UyInvqVXOcBwhcTxS7XsNi-kvJCKGwUJ5", "d69pa8xyni8o6jLLuVSPrZ:APA91bFYDHxM9k7yLul7-WD8xr5MnHiA4X8s9gw_oRZoGp2S7b1TVxvEfUlxL-zsBbcyPrA2JXVsfTlFSi9cUUhxRrFdVH4UtNIbJfwV7hxoYdVnb81ZIIghwFae47oYHKs4fUa3Dbh-"]
            })
        };
    
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).json({ status: true });
            }
        }
    
        request(options, callback);
    }

});


module.exports = router;