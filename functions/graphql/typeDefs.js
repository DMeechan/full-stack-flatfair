import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
    type Query {
        config(client_id: Int!): Config
        configs: [Config]
    }
    
    type Mutation {
        createFlatbond(
            rent: Int!,
            membership_fee: Int!,
            postcode: String!,
            client_id: Int!)
        : Flatbond
    }

    type Config {
        client_id: Int!
        fixed_membership_fee: Boolean!
        fixed_membership_fee_amount: Int!
    }

    type Flatbond {
        rent: Int!
        membership_fee: Int!
        postcode: String!
        client_id: Int!
    }
`