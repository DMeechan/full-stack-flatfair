<template>
  <div>
    <a-row>
      <a-col :span="22">
        <Flatbond :flatbond="$store.state.flatbond" :show-rent="!$store.state.fixed_membership_fee" />
      </a-col>
      <a-col :span="2">
        <nuxt-link :to="`/create`">
          <a-button id="back" type="primary" icon="backward">
            Back
          </a-button>
        </nuxt-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Flatbond from '~/components/Flatbond'

export default {
  components: {
    Flatbond
  }
}
</script>
