<template>
  <div>
    <a-row>
      <a-col :span="22">
        {{ name }}
        <Flatbond :flatbond="flatbond"/>
      </a-col>
      <a-col :span="2">
        <nuxt-link :to="`/create`">
            <a-button type="primary" icon="backward">Go</a-button>
        </nuxt-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Flatbond from '../components/Flatbond'

export default {
  props: {
    flatbond: {
      type: Object,
      default: () => ({})
    },
    name: String
  },
  components: {
    Flatbond
  }
}
</script>
