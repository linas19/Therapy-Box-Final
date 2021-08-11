const express = require('express');
const jwt = require("jsonwebtoken");
const fetch = require('isomorphic-fetch');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const xml2js = require('xml2js');

const config = require("../config/auth.config.js");
const middleware = require("../middleware/index.js");

const User = require('../models/user.model.js')
const Todos = require('../models/todos.model.js')
const Photos = require('../models/photos.model.js')

const router = express.Router();

const s3 = new aws.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.get('/currentUser', [middleware.authJwt.verifyToken], (req, res) => {
    let token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    User.findById(decoded.id)
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
});

router.put('/currentUser', [middleware.authJwt.verifyToken], (req, res) => {
    console.log('body',req.body.winning_team)
    let token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    User.findByIdAndUpdate(decoded.id, {winning_team: req.body.winning_team})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
});

const CLOTHES_URL = `https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil`;
router.get('/clothes', (req, res) => {
    fetch(CLOTHES_URL)
    .then(response => response.text())
    .then(data => res.send(data))
    
});

const RSS_URL = `http://feeds.bbci.co.uk/news/rss.xml`
router.get('/news', (req, res) => {
    fetch(RSS_URL)
    .then(response => response.text())
    .then(data => {
        xml2js.parseString(data, (err, result) => {
            if(err) {
                throw err;
            }
            const jsonNewsData = JSON.stringify(result, null, 4)
            res.send(jsonNewsData)
        })
    })
});

const SPORT_URL = `http://www.football-data.co.uk/mmz4281/1718/I1.csv`
router.get('/sport', (req, res) => {
    fetch(SPORT_URL)
    .then(response => response.text())
    .then(data => res.send(data))
});

router.get('/todos', [middleware.authJwt.verifyToken], (req, res) => {
    Todos.find({ owner_id: req.userId})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
});

router.post('/todos', [middleware.authJwt.verifyToken], (req, res) => {
    const newTodo = new Todos({
        is_completed: req.body.is_completed,
        title: req.body.title,
        owner_id: req.userId
    });
    newTodo.save((todoSaveError) => {
        if (todoSaveError) {
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            User.findById(req.userId)
                .then((userById) => {
                    userById.todos.push(newTodo);
                    userById.save((userUpdateError) => {
                        if (userUpdateError) {
                            res.status(500).json({ msg: 'Sorry, internal server error' });
                        }
                        res.send(newTodo);
                    });
                })
                .catch((error) => {
                    console.log('error', error);
                    res.status(500).json({ msg: 'Sorry, internal server error' });
                })
        }
    })
});

router.put('/todos', [middleware.authJwt.verifyToken], (req, res) => {
    Todos.findByIdAndUpdate(req.body._id, {is_completed: req.body.is_completed, title: req.body.title})
        .then((data) => {
            console.log('Todo Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
});
router.delete('/todos', [middleware.authJwt.verifyToken], (req, res) => {
    console.log('body',req.body._id)
    Todos.findByIdAndRemove(req.body._id)
        .then((data) => {
            console.log('Removed todo ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
});

router.get(
    '/photos',
    [middleware.authJwt.verifyToken],
    (req, res) => {
    Photos.find({ owner_id: req.userId })
        .then((data) => {
            console.log('photo Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
});

router.post(
    '/photos',
    [middleware.authJwt.verifyToken, uploadS3.single('image')],
    (req, res) => {

    const newPhoto = new Photos({
        s3_key: req.file.key,
        name: req.file.originalname,
        url: req.file.location,
        owner_id: req.userId,
    });

    newPhoto.save((photoSaveError) => {
        if (photoSaveError) {
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            User.findById(req.userId)
                .then((userById) => {
                    userById.photos.push(newPhoto);
                    userById.save((userUpdateError) => {
                        if (userUpdateError) {
                            res.status(500).json({ msg: 'Sorry, internal server error' });
                        }
                        res.send(newPhoto);
                    });
                })
                .catch((error) => {
                    console.log('error', error);
                    res.status(500).json({ msg: 'Sorry, internal server error' });
                })
        }
    })
});

module.exports = router;
