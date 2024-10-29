import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]!
  }
`;

const resolvers = {
  Query: {
    users: () => [
      { id: '1', name: 'Iraza malik', email: 'malikirtza96@gmail.com' },
      { id: '2', name: 'Hajima', email: 'malikirtaza302@gmail.com' },
    ],
  },
};

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
