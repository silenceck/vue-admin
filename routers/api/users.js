// login & register
const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../../models/user');
const secret = require('../../config/store').secretOrKey;
  
router.get('/test', (req, res) => {
    res.json({ msg: 'login works'});
})

router.post('/register', (req, res) => {
    const data = req.body;
    User.findOne({email: data.email})
        .then((user) => {
            if(user){
                res.status(400).json({msg: "邮箱已被占用"})
            }else{
                const avatar = gravatar.url(data.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name: data.name,
                    email: data.email,
                    avatar: avatar,
                    password: data.password
                })

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    });
                });
            }
        })
})

router.post('/login', (req, res) => {
    const data = req.body;
    // const email = data.email;  
    // User.findOne({email}) 
    User.findOne({email: data.email}) 
        .then(user => {
            if(!user){
                res.status(400).json({msg: "用户不存在"});
            }

            bcrypt.compare(data.password, user.password)
                .then(isMacth => {
                    if(isMacth){
                        const rule = {id: user.id, name: user.name};
                        jwt.sign(rule, secret, {expiresIn: 3600}, (err, token) => {
                            if(err) throw err;
                            res.json({
                                success: true,
                                token: 'ck' + token
                            })
                        })
                    }else{
                        return res.status(400).json({password: "密码错误"});
                    }
                });
        })
})
module.exports = router;