import { getMembershipFee, validateRent } from '../../../../utils/businessLogic'

const VAT = 1.2 // 20% VAT
const PENCE = 100
const USE_PENCE = true

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
      let value = getMembershipFee(input, USE_PENCE)
      expect(value).to.equal(expected)

      input = {
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 500 * PENCE,
        rentPeriod: 'monthly',
        rent: 8 * PENCE
      }

      expected = 120 * PENCE * VAT // 14 400 = £144
      value = getMembershipFee(input, USE_PENCE)
      expect(value).to.equal(expected)

      input = {
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 500 * PENCE,
        rentPeriod: 'weekly',
        rent: 300 * PENCE
      }

      expected = 300 * PENCE * VAT // 36 000 = £360
      value = getMembershipFee(input, USE_PENCE)
      expect(value).to.equal(expected)
    })
    it('is calculated correctly with a fixed fee', () => {
      let input = {
        fixed_membership_fee: true,
        fixed_membership_fee_amount: 500 * PENCE,
        rentPeriod: 'monthly',
        rent: 800 * PENCE
      }

      let expected = 500 * PENCE * VAT // 60 000 = £600
      let value = getMembershipFee(input, USE_PENCE)
      expect(value).to.equal(expected)

      input = {
        fixed_membership_fee: true,
        fixed_membership_fee_amount: 5 * PENCE,
        rentPeriod: 'monthly',
        rent: 800 * PENCE
      }

      expected = 5 * PENCE * VAT // 600 = £6
      value = getMembershipFee(input, USE_PENCE)
      expect(value).to.equal(expected)
    })
  })

  context('validate rent', () => {
    it('allows only valid values', () => {
      let valid = validateRent(24 * PENCE)
      expect(valid).to.equal.false

      valid = validateRent(25 * PENCE)
      expect(valid).to.equal.true

      valid = validateRent(1024 * PENCE)
      expect(valid).to.equal.true

      valid = validateRent(8660 * PENCE)
      expect(valid).to.equal.true

      valid = validateRent(8661 * PENCE)
      expect(valid).to.equal.false

      valid = validateRent(10024 * PENCE)
      expect(valid).to.equal.false
    })
  })
})
