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
      if (err) return err;
      res.json({
        status: 201,
        token,
      });
    });
  }
}

export default UserController;
