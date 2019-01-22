/* eslint camelcase: [2, {properties: "never"}] */

export const state = () => ({
  flatbond: {
    client_id: 0,
    rent: 0,
    postcode: 'None',
    membership_fee: 0
  }
})

export const mutations = {
  SET_FLATBOND(state, { client_id, rent, postcode, membership_fee }) {
    state.flatbond = {
      client_id,
      rent,
      postcode,
      membership_fee
    }
  }
}
