const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use((req, res, next) => {
    let date = new Date();
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(), req.method, req.path);
    next();
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/login', require('./routes/login'));
app.use('/api/resetPassword', require('./routes/resetPassword'));

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log('Server has been started on port ' + PORT));
    } catch (e) {
        console.log('db, server start error: ' + e.message);
        process.exit(1);
    }
};

start();