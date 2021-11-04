const { Schema, model } = require('mongoose');

let schema = new Schema({
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true }
});

module.exports = model('user', schema);