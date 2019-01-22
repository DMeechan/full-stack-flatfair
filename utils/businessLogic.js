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
