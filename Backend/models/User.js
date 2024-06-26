const express = require('express');
const { Schema, default: mongoose } = require('mongoose');
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        default: "unique"
    },
    date:{
        type: Date,
        default: Date.now
    },

});
module.exports = mongoose.model('user', UserSchema);