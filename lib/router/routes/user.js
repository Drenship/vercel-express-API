const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const { getToken, isAuth } = require('../../utils/user');

const router = express.Router();

// Create new user => Register
router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	let errors = [];

	if (!name || !email || !password) {
		errors.push({ msg: 'Please enter all fields' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (errors.length > 0) {
		res.status(401).send({ message: errors });
	} 

    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            res.status(401).send({ message: 'Email already exists' });
        }

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            user_profil: {
                name: req.body.name,
            },
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    res.status(201).send({
                        ...user._doc,
                        access:  user.access,
                        });
                })
                .catch(err => {
                    res.status(401).send({ message: 'Une erreur est survenue lors de la création de votre compte' });
                });
            });
        });

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
    }
});

// Login user
router.post('/login', async (req, res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).send({ message: 'User not found.' });
        }

        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				res.status(201).send({
					...user._doc,
					token: getToken(user),
				});
			} else {
				res.status(401).send({ message: 'Invalid Password.' });
			} 
		});

    } catch (error) {
        res.status(500).send({ message: 'Invalid Email' });
    }
});

// Update password
router.put('/password', isAuth, async (req, res) => {
    
    try {
        const userId = req.user._id;
        const { current_password, password } = req.body;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(404).send({ message: 'utilisateur introuvalble' });
        }

        bcrypt.compare(current_password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        User.updateOne({ _id: userId }, { $set: { password: hash } }).then(responce => {
                            res.status(202).send({});
                        }).catch(err => {
                            res.status(500).send({ message: 'Une erreur est survenue lors de l\'insertion' });
                        });
                    });
                });
            } else {
                res.status(401).send({ message: 'Invalid Password.' });
            } 
        });

    } catch (error) {
        res.status(500).send({ message: 'Une erreur est survenue lors de l\'insertion' });
    }
});


module.exports = router;