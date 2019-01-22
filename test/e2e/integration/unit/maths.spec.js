import { round, toPence, toInt } from '../../../../utils/maths'

describe('maths', () => {
  context('round', () => {
    it('is rounds to two decimal places', () => {
      let value = round(10.111)
      expect(value).to.equal('10.11')

      value = round(1.566666)
      expect(value).to.equal('1.57')

      value = round(0)
      expect(value).to.equal('0.00')
      
      value = round(-99)
      expect(value).to.equal('-99.00')
    })
  })

  context('to pence', () => {
    it('converts pounds into pence', () => {
      let value = toPence(10)
      expect(value).to.equal(1000)

      value = toPence(99.9)
      expect(value).to.equal(9990)

      value = toPence(0.1)
      expect(value).to.equal(10)
    })
  })

  context('toInt', () => {
    it('converts to integer', () => {
        let value = toInt(1.112)
        expect(value).to.equal(1)

        value = toInt(-99.4)
        expect(value).to.equal(-99)

        value = toInt(0.0)
        expect(value).to.equal(0)
    })
  })
})
