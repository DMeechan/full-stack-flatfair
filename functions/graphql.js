import { ApolloServer } from 'apollo-server-lambda'
// import { ApolloServer, gql, ApolloError } from 'apollo-server-lambda'
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

// ApolloServer hosts our GraphQL API
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.warn('Captain, we have a problem. An error has been detected :(')
    console.error(error)
    return new Error('Internal server error :(')
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  introspection: true // NOTE: this makes using GraphQL Playground much easier, but should be disabled in a real production environment
})

/*
  exports.handler tells Netlify that we want our Netlify Function to use thsis function
  CORS is enabled so devices from other origins (like different localhost ports) can still access the API
*/
exports.handler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowedHeaders: ['Content-Type', 'Origin', 'Accept']
  }
})
