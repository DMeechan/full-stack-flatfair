/**
 * Validate that a flatbond object is valid.
 * If invalid, showError() will be called
 * @param {Object} flatbond 
 * @param {Function} showError(errorType, title)
 */
export const validateFlatbond = (flatbond, showError) => {
    console.log('flatbond: ', flatbond);
  if (flatbond.postcode.length < 5) {
    showError('error', 'Postcode is too short')
    return false
  }

  if (typeof flatbond.membership_fee !== 'number') {
    showError('error', 'Membership fee must be a number')
    return false
  }

  if (typeof flatbond.client_id !== 'number') {
    showError('error', 'Client ID must be a number')
    return false
  }

  if (typeof flatbond.rent !== 'number') {
    showError('error', 'Rent must be a number')
    return false
  }

  return true
}
