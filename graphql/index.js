const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();
process.env.PORT

// DB Connection
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,  // ← change this
  database: process.env.database,        // ← change this
  waitForConnections: true,
});

// Test DB connection on startup
pool.getConnection()
  .then(conn => {
    console.log(' MySQL connected');
    conn.release();
  })
  .catch(err => {
    console.error(' MySQL connection failed:', err.message);
  });

// Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    deleteUser(id: ID!): String
  }
`;

// Resolvers
const resolvers = {
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

// Start Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: { origin: '*' },
  csrfPrevention: false,   // ← fixes "Failed to fetch" in Apollo v3
});

server.listen(4000).then(({ url }) => {
  console.log(` Server running at ${url}`);
});