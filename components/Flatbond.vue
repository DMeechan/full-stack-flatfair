<template>
  <div>
    <a-card
      :title="`Client ${flatbond.client_id} at postcode ${flatbond.postcode}`"
      :bordered="true"
      hoverable
      style="width: 300px"
    >
      <p>
        <b>Rent</b>
        : £{{ rent }}
      </p>
      <p>
        <b>Membership fee</b>
        : £{{ membershipFee }}
      </p>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    flatbond: {
      type: Object,
      required: true
    }
  },
  methods: {
    round(num) {
      // Round always, even a num like 1.5 => 1.50
      // source: https://stackoverflow.com/a/12830454
      return num.toFixed(2)
    }
  },
  computed: {
    membershipFee() {
      return this.round(this.flatbond.rent / 100)
    },
    rent() {
      return this.round(this.flatbond.membership_fee / 100)
    }
  }
}
</script>
