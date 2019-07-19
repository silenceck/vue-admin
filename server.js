const express = require('express');
const mongoose = require('mongoose')
const app = express();

const port = process.env.PORT || 5000;

// DB config
const db = require('./config/store').mongooseURL;

const users = require('./routers/api/users');
// connect to db 
mongoose.connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('hello world! ');
})
app.use('/api/users', users);
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})