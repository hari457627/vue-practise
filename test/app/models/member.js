var express = require('express');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var memberSchema = new schema({
    name:{
        type:String,required:true
    },
    age:{
        type:Number
    },
    designation:{
        type:String,required:true
    }
});

module.exports = mongoose.model('Member',memberSchema)