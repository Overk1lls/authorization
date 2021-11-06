const { Schema, model } = require('mongoose');

let schema = new Schema({
    token: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true }
});

module.exports = model('user', schema);