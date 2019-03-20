import db from '../dB/index';
import Helper from './helper';

const MessageController = {
  async createAMessage(req, res) {
    if (!req.body.senderId || !req.body.receiverId) {
      return res.json({
        status: 400,
        message: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.senderId && req.body.receiverId)) {
      return res.json({
        status: 400,
        message: 'Please enter a valid email address',
      });
    }
    const text = `INSERT INTO
      messages(createdOn, senderId, subject, message, parentMessageId, status, receiverId)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.createdOn,
      req.body.senderId,
      req.body.subject,
      req.body.message,
      req.body.parentMessageId,
      req.body.status,
      req.body.receiverId,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async getAllReceivedMessages(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE receiverId = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.params.id, req.user.id]);
      return res.status(200).json({ rows, rowCount });
    } catch (error) {
      return res.json({
        status: 400,
        error,
      });
    }
  },

  async getAllUnreadMessages(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE ';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).json({ rows, rowCount });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async getAllSentMessages(req, res) {
    const findAllQuery = 'SELECT * FROM messages WHERE';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAMessage(req, res) {
    const text = 'SELECT * FROM messages WHERE id = $1 AND receiverId = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.users.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'message not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async deleteAMessage(req, res) {
    const deleteQuery = 'DELETE FROM messages WHERE id=$1 AND receiverId = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.json({
          status: 404,
          message: 'message not found',
        });
      }
      return res.json({
        status: 204,
        message: 'Successfully deleted',
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default MessageController;
