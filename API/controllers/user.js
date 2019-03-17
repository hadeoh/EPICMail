import jwt from 'jsonwebtoken';

import UserService from '../services/user';

class UserController {
  constructor() {
    this.Users = [];
  }

  static createAUser(req, res) {
    const newUser = req.body;

    const createdUser = UserService.createAUser(newUser);
    return jwt.sign({
      newUser,
    }, 'shshshs', (err, token) => {
      res.json({
        status: 201,
        token,
      });
    });
  }

  static loginAUser(req, res) {
    const user = req.body;
    const loginUser = UserService.loginAUser(user);
    return jwt.sign({
      user,
    }, 'shshshs', (err, token) => {
      res.json({
        status: 200,
        token,
      });
    });
  }
}

export default UserController;
