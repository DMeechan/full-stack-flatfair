import { ApolloServer, gql, ApolloError } from 'apollo-server-lambda'
// import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'

/*
  Removed makeExecutableSchema() from the server pipeline
  because it creates an error on serverless:
  "Unexpected token F in JSON at position 0"
*/
// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log('OH NO, ERROR FOUND :(')
    console.error(error);
    return new Error('Internal server error');
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  introspection: true // NOTE: in a real production environment, this would be disabled; however, enabling this makes using GraphQL Playground much easier
})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept'
    ]
  }
});
