const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routers/api/users');
const profiles = require('./routers/api/profiles');
const app = express();

// DB config
const db = require('./config/store').mongooseURL;

// connect to db 
mongoose.connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello world! ');
})
app.use('/api/users', users);
app.use('/api/profiles', profiles);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})