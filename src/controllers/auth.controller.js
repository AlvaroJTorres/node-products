const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret'
const expiration = process.env.JWT_REFRESH_EXPIRATION || '1d'

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const userByEmailExists = await db.User.findOne({where: {email}});
        if (userByEmailExists) {
            return res.status(400).json({message:'Email is already associated with an account'});
        }

        const userByUsernameExists = await db.User.findOne({where: {username}});
        if (userByUsernameExists) {
            return res.status(400).json({message:`Username ${username} is already associated with an account`});
        }

        const new_user = await db.User.create({
            name,
            username,
            email,
            password: await bcrypt.hash(password, 15),
        });

        const token = jwt.sign({ id: new_user.id }, secret, {
          expiresIn: expiration
      });

      res.status(200).json({data: {
        id: user.id,
        name: user.name,
        username: user.username,
        accessToken: token,
    }});
    } catch (err) {
        return res.status(500).json({message:'Error in registering user'});
    }
}

const signInUser = async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await db.User.findOne({where: {username}});
      if (!user) {
          return res.status(404).json({message:`Username ${username} not found`});
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
          return res.status(404).json({message:'Incorrect username and password combination'});
      }

      const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: expiration
      });

    //   req.session.token = token;
 
      res.status(200).json({data: {
          id: user.id,
          name: user.name,
          username: user.username,
          accessToken: token,
      }});
  } catch (err) {
      return res.status(500).json({message:'Sign in error'});
  }
}

const signOut = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
}

const changePassword = async (req, res) => {
  try {
    const { username, new_password, confirmed_password } = req.body;
    const user = await db.User.findOne({where: {username}});
    if (!user) {
        return res.status(404).json({message:'Invalid username'});
    }

    const passwordMatch = new_password == confirmed_password
    if(!passwordMatch) {
      return res.status(404).json({message:'Passwords do not match, Try again'});
    }

    const updatedPassword = await bcrypt.hash(new_password, 15)

    await user.update({ password: updatedPassword });

    return res.status(200).json({message:'Password updated successfuly'});


  } catch (err) {
    return res.status(500).json({message:'Change password Error'});
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOut,
  changePassword
}