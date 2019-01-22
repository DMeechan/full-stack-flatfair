import { UserInputError } from 'apollo-server-lambda'
import { getMembershipFee, validateRent } from '../../utils/businessLogic'
import { toInt } from '../../utils/maths'

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
  }
]

let flatbonds = [
  {
    rent: 800 * 100,
    membership_fee: (800 / 4) * 1.2,
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

      /*
        If the membership fee is not fixed, let's re-calculate it to verify it
        but we don't know if the rent value is weekly or monthly (an oversight in the API)
        so we'll have to calculate both and check if rent matches either of them
      */
      const expectedWeeklyMembershipFee = getMembershipFee({
        rentPeriod: 'weekly',
        rent,
        ...config
      })

      const expectedMonthlyMembershipFee = getMembershipFee({
        rentPeriod: 'monthly',
        rent,
        ...config
      })

      /*
        I've used double equals (==) here because the input values arrive 
        without decimal places, while the expected values have 2 decimal places
        example: 24000 !== 24000.00
      */
      const valid =
        membership_fee == expectedMonthlyMembershipFee ||
        membership_fee == expectedWeeklyMembershipFee

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
