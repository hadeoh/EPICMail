import db from '../dB/index';

const GroupController = {
  async createAGroup(req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        message: 'Enter group name',
      });
    }
    const text = `INSERT INTO
      groups( name, role)
      VALUES($1, $2)
      returning *`;
    const values = [
      req.body.name,
      req.body.role,
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
};

export default GroupController;