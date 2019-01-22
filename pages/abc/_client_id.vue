<template>
  <div>
    You have id {{ client_id }} =
    {{ config.client_id }}
  </div>
</template>

<script>
import configQuery from '../../apollo/queries/config.gql'

export default {
  apollo: {
    config: {
      query: configQuery,
      prefetch: ({ route }) => ({
        client_id: parseInt(route.params.client_id)
      }),
      variables() {
        return {
          client_id: this.clientId
        }
      }
    }
  },

  computed: {
    clientId() {
      return parseInt(this.$route.params.client_id)
    }
  },

  mounted() {
    console.log('FOUND CLIENT:', this.clientId)
  },

  data() {
    return {
      client_id: this.clientId
    }
  }
}
</script>
