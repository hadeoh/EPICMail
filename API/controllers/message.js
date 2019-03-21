import db from '../dB/index';
import Helper from './helper';

const MessageController = {
  async createAMessage(req, res) {
    if (!req.body.receiverEmail) {
      return res.status(400).json({
        status: 400,
        message: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.receiverEmail)) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter a valid email address',
      });
    }
    const text = `INSERT INTO
      messages( subject, message, receiverEmail)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.subject,
      req.body.message,
      req.body.receiverEmail,
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
    const findAllQuery = 'SELECT * FROM messages WHERE receiverEmail = $1';
    try {
      const rows = await db.query(findAllQuery, [req.user.email]);
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

  async getAllUnreadMessages(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE status= $1';
    try {
      const rows = await db.query(findAllQuery, ['unread']);
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

  async getAllSentMessages(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE senderEmail =$1';
    try {
      const rows = await db.query(findAllQuery, [req.user.email]);
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

  async getAMessage(req, res) {
    const text = 'SELECT * FROM messages WHERE id = $1';
    try {
      const rows = await db.query(text, [req.params.id]);
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

  async deleteAMessage(req, res) {
    const deleteQuery = 'DELETE FROM messages WHERE id=$1 returning *';
    try {
      const rows = await db.query(deleteQuery, [req.params.id]);
      return res.status(204).json({
        status: 204,
        message: 'Successfully deleted',
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
