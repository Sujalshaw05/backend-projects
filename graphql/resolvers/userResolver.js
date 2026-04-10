const pool = require('../config/db');

const userResolvers = {
  Query: {
    getUsers: async () => {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    },
    getUser: async (_, { id }) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const [result] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return { id: result.insertId, name, email };
    },
    deleteUser: async (_, { id }) => {
      await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return `User ${id} deleted`;
    },
  },
};

module.exports = userResolvers;