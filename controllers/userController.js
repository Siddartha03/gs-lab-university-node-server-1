const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Registration controller
exports.registerProcess = (req, res) => {
    const { name, email, password, role } = req.body
    
    const newUser = new User()
    
    newUser.name = name;
    newUser.email = email;
    newUser.role = role
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    
    newUser.password = hash

    User.findOne({ email })
        .then(user => {
            if(!user) {
                newUser.save()
                    .then(() => {
                        res.status(201).send({message:"Successfully registered!"});
                    })
                    .catch(err => res.send("Error occured!"));
            }else {
                res.send("This email is already exists!");
            }
        })
        .catch((err)=> {
            res.send("Registration error occured!");
        })
}

//Login controller
exports.loginProcess = (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email })
        .then(user => { //user = new User()
            if(user) {
                const valid = bcrypt.compareSync(password, user.password)
                const userDetails = {
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                }
                if(valid) {
                    res.status(200).send(userDetails);
                } else {
                    res.send('Email or Password invalid');
                }
            } else {
                res.send("No User found!");
            }
        })
        .catch(err => {
            res.send('Something went wrong');
        })
}

//Password change process
exports.changePassword = (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(newPassword, salt);
    User.findOne({ email })
    .then(user => {
        if(user) {
            const valid = bcrypt.compareSync(oldPassword, user.password)
            if(valid) {
                User.updateOne({email: email}, {$set: {password: hash}})
                    .then(() => {
                        res.status(201).send({message: "Successfully changed"});
                    }).catch(err => {
                        res.send("Something error occured");
                    })
            } else {
                res.send('Old password incorrect');
            }
        } else {
            res.send("No User found");
        }
    })
}