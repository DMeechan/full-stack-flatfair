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

// filter the array by client_id field, grab first element because it should be unique
const findFirstClientId = (arr, client_id) => arr.filter(elem => elem.client_id === client_id)[0]

export const resolvers = {
    Query: {
        config: (_, {client_id}) => findFirstClientId(configs, parseInt(client_id)),
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