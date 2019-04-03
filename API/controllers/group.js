import db from '../dB/index';
import Helper from './helper';

const GroupController = {
  async createAGroup(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: 400,
        message: 'Enter group name',
      });
    }
    const text = `INSERT INTO
      groups(name)
      VALUES($1)
      returning *`;
    const values = [
      name,
    ];
    try {
      const rows = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  },

  async getAllGroups(req, res) {
    const findAllQuery = 'SELECT * FROM groups WHERE role=$1;';
    try {
      const rows = await db.query(findAllQuery, ['admin']);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          data: 'Groups not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async editGroupName(req, res) {
    const { name } = req.body;
    const findAllQuery = 'UPDATE groups SET name=$1 WHERE id=$2 AND role=$3 RETURNING * ;';
    try {
      const rows = await db.query(findAllQuery, [name, req.params.id, 'admin']);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          data: 'Groups not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async deleteGroup(req, res) {
    const deleteQuery = 'DELETE FROM groups WHERE id=$1 returning *;';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      return res.status(200).json({
        status: 200,
        data: [{ message: 'Successfully deleted' }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async addUserToGroup(req, res) {
    let { email } = req.body;
    const { id } = req.params;
    if (!email) {
      return res.status(400).json({
        status: 400,
        message: 'Please provide the email address',
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
    try {
      const validUser = await db.query('SELECT * FROM users WHERE email=$1;', [email]);
      if (validUser.rows.length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'The email entered in not present on EPICMail',
        });
      }
      const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1;', [id]);
      if (getGroupId.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'No such group exists',
        });
      }
      const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userId =$1;', [email]);
      if (ifUserInGroup.rows.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'User exists already',
        });
      }
      const text = 'INSERT INTO groupMembers(userId) VALUES($1) returning *';
      const values = [
        email,
      ];
      const rows = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async deleteUserFromGroup(req, res) {
    const { id, memId } = req.params;
    try {
      const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1;', [id]);
      if (getGroupId.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'No such group exists',
        });
      }
      const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE id =$1;', [memId]);
      if (ifUserInGroup.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'No such user exists in the group',
        });
      }
      const deleteQuery = 'DELETE FROM groupmembers WHERE id=$1 returning *;';
      const { rows } = await db.query(deleteQuery, [memId]);
      return res.status(200).json({
        status: 200,
        data: [{ message: 'Successfully deleted' }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
}

export default GroupController;
