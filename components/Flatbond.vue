<template>
  <div>
    <p>
      Flatbond for client {{ flatbond.client_id }}
      Rent? {{ flatbond.rent }}
      Postcode? {{ flatbond.postcode }}
      Fee? {{ flatbond.membership_fee }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    flatbond: Object
    // client_id: Number,
    // fixed_membership_fee: Boolean,
    // fixed_membership_fee_amount: Number
  }
}
</script>
