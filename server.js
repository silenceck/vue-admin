const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routers/api/users');
const app = express();

// DB config
const db = require('./config/store').mongooseURL;

// connect to db 
mongoose.connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

// 使用body-parser 中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello world! ');
})
app.use('/api/users', users);
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})