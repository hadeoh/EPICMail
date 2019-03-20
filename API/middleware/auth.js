import jwt from 'jsonwebtoken';
import db from '../dB/index';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.json({
        status: 400,
        message: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id=$1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.json({
          status: 400,
          message: 'Provide a valid token',
        });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.json({
        status: 400,
        error,
      });
    }
  },
};

export default Auth;
