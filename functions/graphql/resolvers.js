import { find } from "rxjs/operator/find";

let configs = [
    {
        client_id: 1,
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 0
    },
    {
        client_id: 2,
        fixed_membership_fee: true,
        fixed_membership_fee_amount: 150 * 100
    },
    {
        client_id: 3,
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 250 * 100
    },
]

let flatbonds = [
    {
        rent: 800 * 100,
        membership_fee: (800 / 4) * 1.2,
        postcode: "AWS EC2",
        client_id: 1
    }
]

export const resolvers = {
    Query: {
        config: (_, { id }) => find(configs, { id }),
        configs: () => configs
    },

    Mutation: {
        createFlatbond: (_, flatbond) => {
            // TODO: Validate that the flatbond is valid
            flatbonds.push(flatbond)
            return flatbond
        }
    }
}