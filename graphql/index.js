const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/userResolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: { origin: '*' },
  csrfPrevention: false,
});

server.listen(4000).then(({ url }) => {
  console.log(` Server running at ${url}`);
});