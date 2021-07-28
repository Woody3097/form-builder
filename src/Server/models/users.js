const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const UserSchema= new Schema({
    email: String,
    password: String,
    previewArr: Array
});

module.exports = mongoose.model('user', UserSchema, 'users');
