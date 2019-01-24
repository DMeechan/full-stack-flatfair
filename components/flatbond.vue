<template>
  <div>
    <a-card :title="`Client ${flatbond.client_id}`" :bordered="false" style="width: 300px">
      <p>
        <b>Postcode:</b>
        {{ flatbond.postcode }}
      </p>
      <p v-if="showRent">
        <b>Rent:</b>
        £{{ rent }}
      </p>
      <p>
        <b>Membership fee:</b>
        £{{ membershipFee }}
      </p>
    </a-card>
  </div>
</template>

<script>
import { round } from '~/utils/maths.js'

export default {
  props: {
    flatbond: {
      type: Object,
      required: true
    },
    showRent: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    membershipFee() {
      return round(this.flatbond.membership_fee / 100)
    },
    rent() {
      return round(this.flatbond.rent / 100)
    }
  },
}
</script>
