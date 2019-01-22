import { getMembershipFee } from '../../../../utils/businessLogic'

const VAT = 1.2 // 20% VAT
const PENCE = 100

describe('business logic', () => {
  context('membership fee', () => {
    it('is calculated correctly with a non-fixed fee', () => {
      let input = {
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 500 * PENCE,
        rentPeriod: 'monthly',
        rent: 800 * PENCE
      }

      let expected = ((800 * PENCE) / 4) * VAT // 24 000 = £240
      let value = getMembershipFee(input)

      t.is(value, expected)

      input = {
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 500 * PENCE,
        rentPeriod: 'weekly',
        rent: 300 * PENCE
      }

      expected = 300 * PENCE * VAT // 36 000 = £360
      value = getMembershipFee(input)

      t.is(value, expected)
    })
    it('is calculated correctly with a fixed fee', () => {
      let input = {
        fixed_membership_fee: true,
        fixed_membership_fee_amount: 500 * PENCE,
        rentPeriod: 'monthly',
        rent: 800 * PENCE
      }

      let expected = 500 * PENCE * VAT // 60 000 = £600
      let value = getMembershipFee(input)

      t.is(value, expected)
    })
  })
})
