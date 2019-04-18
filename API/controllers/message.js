import db from '../dB/index';
import Helper from './helper';

const MessageController = {
  async createAMessage(req, res) {
    let {
      senderEmail,
      receiverEmail,
      subject,
      message,
    } = req.body;
    if (!receiverEmail) {
      return res.status(400).json({
        status: 400,
        message: 'Please input the receiverEmail address',
      });
    }
    receiverEmail = receiverEmail.toLowerCase();
    receiverEmail = receiverEmail.trim();
    req.body.receiverEmail = receiverEmail;
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
        message: 'Please enter the message to be created',
      });
    }
    message = message.trim();
    req.body.message = message;
    if (!Helper.isValidEmail(receiverEmail)) {
      return res.status(401).json({
        status: 401,
        message: 'Please enter a valid email address',
      });
    }

    const text = `INSERT INTO
      messages( senderEmail, subject, message, receiverEmail)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      senderEmail = req.user.email,
      subject,
      message,
      receiverEmail,
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

  async getAllReceivedMessages(req, res) {
    const {
      email,
    } = req.user;
    const findAllQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
    try {
      const { rows } = await db.query(findAllQuery, [email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Messages not found',
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

  async getAllUnreadMessages(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE status= $1';
    try {
      const { rows } = await db.query(findAllQuery, ['unread']);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Messages not found',
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

  async getAllSentMessages(req, res) {
    const {
      email,
    } = req.user;
    const findAllQuery = 'SELECT * FROM messages WHERE senderEmail =$1';
    try {
      const { rows } = await db.query(findAllQuery, [email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Messages not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },

  async getAMessage(req, res) {
    const { id } = req.params;
    const text = 'SELECT * FROM messages WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Messages not found',
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

  async deleteAMessage(req, res) {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM messages WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Message not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'Successfully deleted',
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
};

export default MessageController;