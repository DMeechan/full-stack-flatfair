import { UserInputError } from 'apollo-server-lambda'
import { validateRent, isFlatbondValid } from '../../utils/businessLogic'
import { toPence } from '../../utils/maths'

let configs = [
  {
    client_id: 1,
    fixed_membership_fee: false,
    fixed_membership_fee_amount: toPence(0)
  },
  {
    client_id: 2,
    fixed_membership_fee: true,
    fixed_membership_fee_amount: toPence(150)
  },
  {
    client_id: 3,
    fixed_membership_fee: false,
    fixed_membership_fee_amount: toPence(250)
  }
]

let flatbonds = [
  {
    rent: toPence(800),
    membership_fee: toPence((800 / 4) * 1.2),
    postcode: 'AWS EC2',
    client_id: 1
  }
]

/**
 * filter the array by client_id and then grab first element because it should be unique
 * @param {array} array
 * @param {number} client_id
 * @return {Object} config
 */
const findClientById = (array, client_id) =>
  array.filter(item => item.client_id === client_id)[0]

export const resolvers = {
  Query: {
    config: (_, { client_id }) => findClientById(configs, parseInt(client_id)),
    configs: () => configs
  },

  Mutation: {
    createFlatbond: (_, flatbond) => {
      const { rent, postcode, client_id, membership_fee } = flatbond
      const config = findClientById(configs, client_id)

      // Verify that the rent value is within the acceptable range
      if (!validateRent(rent))
        throw new UserInputError(
          'Unable to create flatbond; rent fee is incorrect'
        )

      const valid = isFlatbondValid(rent, config)

      if (valid) {
        flatbonds.push(flatbond)
        return flatbond
      } else {
        console.log(
          `membership_fee: ${membership_fee} !== ${expectedMonthlyMembershipFee} or ${expectedWeeklyMembershipFee}`
        )
        throw new UserInputError(
          'Unable to create flatbond; membership fee is incorrect'
        )
      }
    }
  }
}
