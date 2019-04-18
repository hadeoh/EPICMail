import jwt from 'jsonwebtoken';
import db from '../dB/index';
import Helper from './helper';


const UserController = {
  async create(req, res) {
    let {
      email, firstName, lastName,
    } = req.body;
    const { password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 400,
        message: 'Enter your email address',
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    req.body.email = email;
    if (!Helper.isValidEmail(email)) {
      return res.status(401).json({
        status: 401,
        message: 'Please enter a valid email address',
      });
    }
    if (!firstName) {
      return res.status(400).json({
        status: 400,
        message: 'Enter your first name',
      });
    }
    firstName = firstName.trim();
    req.body.firstName = firstName;
    if (!lastName) {
      return res.status(400).json({
        status: 400,
        message: 'Enter your last name',
      });
    } if (!password) {
      return res.status(400).json({
        status: 400,
        message: 'The password is required',
      });
    }
    lastName = lastName.trim();
    req.body.lastName = lastName;

    const hashPassword = Helper.hashPassword(password);
    const createQuery = `INSERT INTO
      users(email, firstName, lastName, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [email, firstName, lastName, hashPassword];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          id: rows[0].id,
          email,
          firstName,
          lastName,
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          message: 'User with that email already exists',
        });
      }
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async login(req, res) {
    let {
      email,
    } = req.body;
    const { password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 400,
        message: 'Your email address is missing',
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    req.body.email = email;
    if (!password) {
      return res.status(400).json({
        status: 400,
        message: 'Password is required',
      });
    }
    if (!Helper.isValidEmail(email)) {
      return res.status(401).json({
        status: 401,
        message: 'Please enter a valid email address',
      });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const {
        rows,
      } = await db.query(text, [email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'The email you provided is incorrect',
        });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(400).json({
          status: 400,
          message: 'The password you provided is incorrect',
        });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).json({
        status: 200,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async getAllUsers(req, res) {
    try {
      const { rows } = await db.query('SELECT id, email, firstName, lastName FROM users');
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Users not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async getAUser(req, res) {
    const { id } = req.params;
    try {
      const { rows } = await db.query('SELECT id, email, firstName, lastName FROM users WHERE id = $1;', [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Users not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
};

export default UserController;
