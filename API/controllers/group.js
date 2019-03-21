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

  async getAllGroups(req, res) {
    const findAllQuery = 'SELECT * FROM groups WHERE role = $1';
    try {
      const rows = await db.query(findAllQuery, [req.user.id]);
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
    const findAllQuery = 'UPDATE groups SET name=$1 WHERE id=$2 AND role=$3 RETURNING * ;';
    try {
      const rows = await db.query(findAllQuery, [req.body.name, req.params.id, req.body.role]);
      return res.status(200).json({
        status: 200,
        data: rows.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async deleteGroup(req, res) {
    const findAllQuery = 'DELETE FROM groups WHERE id=$1 returning *;';
    try {
      const rows = await db.query(findAllQuery, [req.params.id]);
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
}

export default GroupController;
