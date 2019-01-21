import { ApolloServer } from 'apollo-server-lambda'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = new ApolloServer(schema)

exports.handler = server.createHandler({
    cors: {
        origin: '*' // TODO: allow requests from anywhere
    }
})