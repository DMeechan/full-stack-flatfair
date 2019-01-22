import { validateFlatbond } from '../../../../utils/validation'

function showError() {}

describe('validate', () => {
  context('flatbonds', () => {
    it('checks flatbond inputs have the right data types', () => {
      let input = {
        postcode: 'AWS EC2',
        membership_fee: 'a',
        client_id: 1,
        rent: 2
      }

      let value = validateFlatbond(input, showError)
      expect(value).to.equal.false

      input = {
        postcode: 'AWS EC2',
        membership_fee: 10000,
        client_id: '1',
        rent: 2
      }

      value = validateFlatbond(input, showError)
      expect(value).to.equal.false

      input = {
        postcode: 'AWS EC2',
        membership_fee: 10000,
        client_id: '1',
        rent: null
      }

      value = validateFlatbond(input, showError)
      expect(value).to.equal.false

      input = {
        postcode: 12345,
        membership_fee: 10000,
        client_id: '1',
        rent: null
      }

      value = validateFlatbond(input, showError)
      expect(value).to.equal.false
    })
    it('checks postcode is right length', () => {
      let input = {
        postcode: 'AWS',
        membership_fee: 10000,
        client_id: 1,
        rent: 2000
      }

      let value = validateFlatbond(input, showError)
      expect(value).to.equal.false

      input = {
        postcode: 'AWS EC2',
        membership_fee: 10000,
        client_id: 1,
        rent: 2000
      }

      value = validateFlatbond(input, showError)
      expect(value).to.equal.true
    })
  })
})
