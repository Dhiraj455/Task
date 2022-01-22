const express = require('express');
const router = express.Router();
const { networkInterfaces } = require('os');
const mongoose = require('mongoose');
const pser = mongoose.model('User');
const counts = mongoose.model('Count');
const visits = mongoose.model('Visit');
const reqip = require('@supercharge/request-ip');
const { count } = require('../models/user.model');
// const User = require('../models/user.model');
siteviews = function () {
    visits.findByIdAndUpdate('61ebe328c4c779430d55c026', { $inc: { count: 1 } }, { new: true },(eer,data) => {
        if(!eer){
            console.log(data.count);
        }
        else{
            console.log("Error");
        }
    })
}
router.get('/signup', (req, res) => {
    res.render('user/signup');
})
router.get('/login', (req, res) => {
    res.render('user/signin');
})
router.get('/userprofile', (req, res) => {
    res.render('user/userprofile');
})
router.get('/count', (req, res) => {
    siteviews();
    res.render('user/count');
})
router.get('/dashboard', (req, res) => {
    counts.find({}, function (err, doc) {
        if (!err) {
            visits.findOne({ _id: '61ebe328c4c779430d55c026' }, (eer, data) => {
                res.render("user/dashboard", {
                    list: doc,
                    counter: data.count
                })
            })
        }
        else {
            console.log("Error");
        }
    });
})
router.post('/signup', (req, res) => {
    try {
        const user = new pser({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log("posted");
        user.save();
        res.redirect('/login');
    }
    catch (error) {
        console.log(error);
        res.redirect('/signup');
    }
})
router.post('/login', async (req, res) => {
    try {
        let foundUser = pser.find((eer, data) => req.body.email === data.email && req.body.password === data.password);
        if (foundUser) {
            const email = req.body.email;
            const found = await pser.findOne({ email: email })
            nam = found._id
            if (req.body.password === found.password) {
                res.redirect('/userprofile/' + nam)
            }
            else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/login'>login again</a></div>");
            }
        }
        else {
            res.send(`<h1>User Not Exist</h1>`);
        }
    } catch (error) {
        res.send("Internal server error" + error);
    }
});
// router.get('/userprofile', (req, res) => {
// res.render('user/userprofile')
// pser.find({}, function (err, doc) {
//     const found = pser.find((eer,doc) => emr === doc.email)
//     if (!err) {
//         console.log(err);
//     }
//     if(found){
//         res.render("user/userprofile", { 
//             name: found.name,
//             email: found.email,
//             password: found.password
//          })
//     } 
//     else {
//         console.log("Error");
//     }
// })
// })
router.get('/userprofile/:id', (req, res) => {
    try {
        pser.findById(req.params.id, (eer, doc) => {
            if (!eer) {
                res.render('user/userprofile', {
                    id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    password: doc.password,
                    age: doc.age,
                    about: doc.about
                });
            }
            else {
                console.log("Error" + eer);
            }
        })
    }
    catch (error) {
        res.send("error is" + error);
    }
})
router.get('/edit/:id', (req, res) => {
    try {
        pser.findById(req.params.id, (eer, doc) => {
            if (!eer) {
                res.render('user/edit', {
                    id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    password: doc.password,
                    age: doc.age,
                    about: doc.about
                });
            }
            else {
                console.log("Error" + eer);
            }
        })
    }
    catch (error) {
        res.send("error is" + error);
    }
})
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    const user1 = new pser;
    try {
        pser.findByIdAndUpdate(id, req.body, { new: true }, (eer) => {
            if (!eer) {
                res.redirect('/userprofile/' + id);
            }
            else {
                console.log("Error" + eer);
            }
        })
    }
    catch (error) {
        res.send("error is" + error);
    }
})
router.post('/count', (req, res) => {
    const nets = networkInterfaces();
    const results = Object.create(null);
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    // console.log(results["Local Area Connection* 2"][0]);
    // var clientIp = reqip.getClientIp(req);
    // var id = req.body.id
    try {
        const cuser = new counts({
            id: req.body.id,
            ip: results["Local Area Connection* 2"][0],
        })
        console.log("posted");
        cuser.save();
        res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
        res.redirect('/count');
    }
})
module.exports = router;