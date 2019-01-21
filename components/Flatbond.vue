<template>
<div>
    <p>
        Flatbond for client {{ client_id }}
        Fee? {{ fixed_membership_fee }}
        Amount? {{ fixed_membership_fee_amount }}
    </p>
</div>
</template>

<script>
export default {
    props: {
        client_id: Number,
        fixed_membership_fee: Boolean,
        fixed_membership_fee_amount: Number
    }
}
</script>
