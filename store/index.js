/* eslint camelcase: [2, {properties: "never"}] */

export const state = () => ({
  flatbond: {
    client_id: 1,
    rent: 10,
    postcode: 'aa',
    membership_fee: 50
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
