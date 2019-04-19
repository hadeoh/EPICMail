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
    const text = 'INSERT INTO groups(name) VALUES($1) returning *;';
    const values = [name];
    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows,
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
    const { id } = req.params;
    if (!name) {
      return res.status(400).json({
        status: 400,
        message: 'Enter group name',
      });
    }
    const editQuery = 'UPDATE groups SET name=$1 WHERE id=$2 AND role=$3 RETURNING * ;';
    try {
      const rows = await db.query(editQuery, [name, id, 'admin']);
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

  async deleteAGroup(req, res) {
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
    let { userEmail } = req.body;
    const { id } = req.params;
    const member = req.body.userEmail;
    if (!userEmail) {
      return res.status(400).json({
        status: 400,
        message: 'Please provide the email address',
      });
    }
    userEmail = userEmail.toLowerCase().trim();
    req.body.userEmail = userEmail;
    if (!Helper.isValidEmail(userEmail)) {
      return res.status(401).json({
        status: 401,
        message: 'Please enter a valid email address',
      });
    }
    try {
      const validUser = await db.query('SELECT * FROM users WHERE email=$1;', [member]);
      if (validUser.rows.length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'The email entered is not present on EPICMail',
        });
      }
      const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
      if (getGroupId.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'No such group exists',
        });
      }
      const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userEmail =$1;', [userEmail]);
      if (ifUserInGroup.rows.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'User exists already',
        });
      }
      const text = 'INSERT INTO groupMembers(groupId, userId, userEmail) VALUES($1, $2, $3) returning *';
      const values = [
        getGroupId.rows[0].id,
        validUser.rows[0].id,
        userEmail,
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
    const { id, userId } = req.params;
    try {
      const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
      if (getGroupId.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'Your actions on this group are limited',
        });
      }
      const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userId =$1;', [userId]);
      if (ifUserInGroup.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'No such user exists in the group',
        });
      }
      const deleteQuery = 'DELETE FROM groupmembers WHERE userId=$1 returning *;';
      const { rows } = await db.query(deleteQuery, [userId]);
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

  async getAllGroupUsers(req, res) {
    const { id } = req.params;
    try {
      const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
      if (getGroupId.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'Your actions on this group are limited',
        });
      }
      const findAllQuery = 'SELECT * FROM groupMembers WHERE userRole = $1;';
      const { rows } = await db.query(findAllQuery, ['member']);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          data: 'Users not found',
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

  async getAGroupUser(req, res) {
    const { id, userId } = req.params;
    try {
      const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
      if (getGroupId.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: 'Your actions on this group are limited',
        });
      }
      const findAllQuery = 'SELECT * FROM groupMembers WHERE userId = $1;';
      const { rows } = await db.query(findAllQuery, [userId]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
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


  async sendEmailToGroup(req, res) {
    let {
      senderEmail,
      subject,
      message,
    } = req.body;
    const { id } = req.params;
    if (!subject) {
      return res.status(400).json({
        status: 400,
        message: 'The subject field is required',
      });
    }
    subject = subject.trim();
    req.body.subject = subject;
    if (!message) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter the message to be sent to the group',
      });
    }
    message = message.trim();
    req.body.message = message;
    const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role = $2;', [id, 'admin']);
    if (getGroupId.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'You have no existing group',
      });
    }
    const text = `INSERT INTO
      groupMessages( groupId, senderEmail, subject, message)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      getGroupId.rows[0].id,
      senderEmail = req.user.email,
      subject,
      message,
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
        error: error.message,
      });
    }
  },

  async getAllReceivedGroupEmail(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
    if (getGroupId.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'No such group exists',
      });
    }
    const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userEmail =$1;', [email]);
    if (ifUserInGroup.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'User is not present in the group',
      });
    }
    const findAllQuery = 'SELECT * FROM groupMessages WHERE groupId =$1';
    try {
      const rows = await db.query(findAllQuery, [id]);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          data: 'Messages not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows.rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },

  async getSentGroupEmail(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
    if (getGroupId.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'No such group exists',
      });
    }
    const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userEmail =$1;', [email]);
    if (ifUserInGroup.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'User is not present in the group',
      });
    }
    const findAllQuery = 'SELECT * FROM groupMessages WHERE senderEmail =$1';
    try {
      const rows = await db.query(findAllQuery, [email]);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          data: 'Messages not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows.rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },

  async getUnreadGroupEmail(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
    if (getGroupId.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'No such group exists',
      });
    }
    const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userEmail =$1;', [email]);
    if (ifUserInGroup.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'User is not present in the group',
      });
    }
    const findAllQuery = 'SELECT * FROM groupMessages WHERE status= $1';
    try {
      const rows = await db.query(findAllQuery, ['unread']);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          data: 'Messages not found',
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

  async getAGroupEmail(req, res) {
    const { id, msgId } = req.params;
    const { email } = req.user;
    const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
    if (getGroupId.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'No such group exists',
      });
    }
    const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userEmail =$1;', [email]);
    if (ifUserInGroup.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'User is not present in the group',
      });
    }
    const text = 'SELECT * FROM groupMessages WHERE id = $1';
    try {
      const rows = await db.query(text, [msgId]);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          data: 'Message not found',
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

  async deleteAGroupEmail(req, res) {
    const { id, msgId } = req.params;
    const { email } = req.user;
    const getGroupId = await db.query('SELECT * FROM groups WHERE id = $1 AND role=$2;', [id, 'admin']);
    if (getGroupId.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'No such group exists',
      });
    }
    const ifUserInGroup = await db.query('SELECT * FROM groupMembers WHERE userEmail =$1;', [email]);
    if (ifUserInGroup.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'User is not present in the group',
      });
    }
    const deleteQuery = 'DELETE FROM groupMessages WHERE id = $1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [msgId]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Message not found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Successfully deleted',
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
