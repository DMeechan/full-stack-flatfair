import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
    type Query {
        config(id: Int!): Config
        configs: [Config]
    }
    
    type Mutation {
        createFlatbond(rent: Int!, membership_fee: Int!, postcode: String!, client_id: Int!): Flatbond
    }

    type Config {
        client_id
        fixed_membership_fee
        fixed_membership_fee_amount
    }

    type Flatbond {
        rent
        membership_fee
        postcode
        client_id
    }
`