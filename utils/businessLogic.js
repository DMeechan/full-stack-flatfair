import { round } from './maths.js'

const VAT = 1.2 // 20% VAT

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
  if (fixed_membership_fee === true) return fixed_membership_fee_amount * VAT

  // If not, we'll calculate the fee by doing weekly rent * VAT
  const weeklyRent = rentPeriod === 'monthly' ? rent / 4 : rent
  const membershipFee = round(weeklyRent * VAT)

  // Finally, let's check that the fee is at least £120 + VAT
  // And return whichever one is bigger: the minimum fee or the calculated fee
  const minimumFee = 120 * VAT
  const actualFee = membershipFee < minimumFee ? minimumFee : membershipFee
  return actualFee
}
