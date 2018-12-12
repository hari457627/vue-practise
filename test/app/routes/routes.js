var express = require('express');
var router = express.Router();
var Member = require('./../models/member.js');

router.route('/')
.get(function (req,res) {
    console.log("get called");
    Member.find().exec().then(function (response) {
       console.log(response);
       res.json(reponse);
    }).catch(function (error) {
        response.status(500).json({error: error});
    });
})
    .post(function (req,res) {
        console.log("get called");
        Member.create(req.body).then(function (response) {
            console.log(response);
            res.send(response);
        }).catch(function (error) {
            response.status(500).json({error: error});
        });
    })
router.route('/:id')
.get(function (req,res) {
    console.log("finding one method");
    console.log(req.params.id);
    Member.findOne({'_id':req.params.id}).exec().then(function (response) {
        console.log(response);
        res.json(response);
    }).catch(function (err) {
        response.status(500).json({error: error});
    })
})

    .put(function (req,res) {
        console.log("finding one method");
        console.log(req.params.id);
        Member.findOneAndUpdate({'_id':req.params.id,},req.body,{new:true}).then(function (response) {
            console.log(response);
            res.json(response);
        }).catch(function (err) {
            response.status(500).json({error: error});
        })
    })


module.exports = router;