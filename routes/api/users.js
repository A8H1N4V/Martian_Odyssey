const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

router.get('/:username/', (req, res) => {
    User
        .findOne( { username: req.params.username })
        .then( user => res.status(200).json({ signupDate: user.date}));
});

router.post('/signup', (req, res) => {
    const {errors, isValid } = validateSignupInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne( { username: req.body.username })
    .then( user => {
        if (user) {
            errors.username = 'That username is already taken.';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
              });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then( user => res.json(user))
                        .catch( err => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne( { username } )
        .then(user => {
            if (!user) {
                errors.username = 'User not found';
                return res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                            });
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
    });
});

module.exports = router;