import db from '../dB/index';
import Helper from './helper';


const UserController = {
  async create(req, res) {
    if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter a valid email address',
      });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(email, firstName, lastName, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [req.body.email, req.body.firstName, req.body.lastName, hashPassword];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].mail, rows[0].id);
      return res.status(201).json({
        status: 201,
        data: token,
      });
    } catch (error) {
      if (error.routine === 'bt_check_unique') {
        return res.status(400).json({
          status: 400,
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
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter a valid email address',
      });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const {
        rows,
      } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'The credentials you provided is incorrect',
        });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          status: 400,
          message: 'The credentials you provided is incorrect',
        });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].email);
      return res.status(200).json({
        status: 200,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  },
};

export default UserController;
