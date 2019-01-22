import { round, toInt, toPence } from './maths.js'

const VAT = 1.2 // 20% VAT
const format = number => toInt(round(number))

/**
 * Calculate membership fee by considering rent and fixed membership fees
 * @param {Object} fixed_membership_fee, fixed_membership_fee_amount, rentPeriod, rent
 */
export const getMembershipFee = ({
  fixed_membership_fee,
  fixed_membership_fee_amount,
  rentPeriod,
  rent
}) => {
  // Use the fixed membership fee if given
  if (fixed_membership_fee === true)
    return format(fixed_membership_fee_amount * VAT)

  // If they dont have fixed membership, we'll calculate the fee by doing weekly rent * VAT
  const weeklyRent = rentPeriod === 'monthly' ? rent / 4 : rent
  const membershipFee = format(weeklyRent * VAT)

  // Finally, let's check that the fee is at least £120 + VAT
  // And return whichever one is bigger: the minimum fee or the calculated fee
  const minimumFee = toPence(120 * VAT)
  const actualFee = membershipFee < minimumFee ? minimumFee : membershipFee
  return actualFee
}

/**
 * Validate that rent is within an acceptable range (for either weekly or monthly rent)
 * @param {number} rent (pence)
 * @return {boolean} isValid
 */
export const validateRent = rent => {
  /*
  The server doesn't know if the rent value that has been provided is
  a weekly or monthly value (because the API doesn't include that info)
  so we'll have to use the weekly lower bound (£25) and the 
  monthly upper bound (£8660) to ensure that we don't mistakenly label valid
  inputs as invalid
  */

  // Note that this is all in pence
  const minimum = toPence(25)
  const maximum = toPence(8660)

  return rent >= minimum && rent <= maximum
}

/**
 * Check the calculation of a flatbond membership. We need to check it for both
 * weekly and monthly rent amounts, since we don't know which one the user has chosen
 * @param {number} rent
 * @param {Object} config
 * @return {boolean} isValid
 */
export const isFlatbondValid = (rent, config) => {
  /*
    If the membership fee is not fixed, let's re-calculate it to verify it
    but we don't know if the rent value is weekly or monthly (an oversight in the API)
    so we'll have to calculate both and check if rent matches either of them
  */
  const expectedWeeklyMembershipFee = getMembershipFee({
    rentPeriod: 'weekly',
    fixed_membership_fee: config.fixed_membership_fee,
    fixed_membership_fee_amount: config.fixed_membership_fee_amount,
    rent
  })

  const expectedMonthlyMembershipFee = getMembershipFee({
    rentPeriod: 'monthly',
    fixed_membership_fee: config.fixed_membership_fee,
    fixed_membership_fee_amount: config.fixed_membership_fee_amount,
    rent
  })

  /*
    I've used double equals (==) here because the input values arrive 
    without decimal places, while the expected values have 2 decimal places
    example: 24000 !== 24000.00
  */
  const valid =
    membership_fee == expectedMonthlyMembershipFee ||
    membership_fee == expectedWeeklyMembershipFee

  return valid
}
