const express = require('express');
const app = express();
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const { Activity } = require('./db/models/activity.model');
const { Room } = require('./db/models/room.model');
const { User } = require('./db/models/user.model');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    })
});

app.post('/users', (req, res) => {
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.roomId = req.body.roomId;
    newUser.save().then((userDoc => {
        res.send(userDoc);
    }))
});

app.get('/rooms', (req, res) => {
    Room.find({}).then((rooms) => {
        res.send(rooms)
    })
});

app.post('/rooms', (req, res) => {
    let newRoom = new Room();
    newRoom.name = req.body.name;
    newRoom.save().then((roomDoc => {
        res.send(roomDoc);
    }))
});

app.get('/activities', (req, res) => {
    Activity.find({}).then((activities) => {
        res.send(activities)
    })
});

app.post('/activities', (req, res) => {
    let newActivity = new Activity();
    newActivity.name = req.body.name;
    newActivity.points = req.body.points;
    newActivity.save().then((activityDoc => {
        res.send(activityDoc);
    }))
});

app.patch('/activities', (req, res) => {
    Activity.updateMany({_id: { $in: req.body.activityIds } }, {
        $set: {completed: true}
    }).then(() => {
        res.send({message: "Updated successfully!"});
    })
});

app.delete('/activities/:id', (req, res) => {
    Activity.findOneAndRemove({_id: req.params.id }).then((removedActivity) => {
        res.send(removedActivity);
    })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});