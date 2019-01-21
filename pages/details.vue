<template>
  <div>
      {{ name }}
      <Flatbond :flatbond="flatbond"/>
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
