userCtrl = {};

const User = require('../models/User');

userCtrl.getUser = async(req, res) => {
    const users = await User.find();
    res.send(users);
}

userCtrl.createUser = async (req, res) =>{
    //consulta de que datos nos envian 
    const {username} = req.body;
    const newUser = new User ({username});
    await newUser.save();
    res.json('User Created');
}
userCtrl.deleteUser = async (req, res) =>{ 
    await User.findOneAndDelete({_id: req.params.id});
    res.json('User Delete');
}

module.exports = userCtrl;