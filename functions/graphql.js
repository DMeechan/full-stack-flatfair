import { ApolloServer, gql } from 'apollo-server-lambda'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

// exports.handler = server.createHandler({
//   cors: {
//     origin: '*',
//   }
// })

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