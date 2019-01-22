<template>
  <div>
    <a-row>
      <a-col :span="24">
        <h1>Create a flatbond for client {{ clientId }}</h1>
      </a-col>
    </a-row>
    <p>How much is your rent?</p>
    <a-row :gutter="32">
      <a-col :span="6">
        <a-input-number
          :defaultValue="800"
          :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
          :min="rentPeriod === 'monthly' ? 110 : 25"
          :max="rentPeriod === 'monthly' ? 8660 : 2000"
          v-model="rent"
          ref="rent"
          auto-focus
        >
          <a-icon slot="prefix" type="pound"/>
        </a-input-number>
      </a-col>
      <a-col :span="6">
        <div>
          <a-radio-group v-model="rentPeriod">
            <a-radio-button value="weekly">Weekly</a-radio-button>
            <a-radio-button value="monthly">Monthly</a-radio-button>
          </a-radio-group>
        </div>
      </a-col>
    </a-row>
    <p class="vertical-space">What's your postcode?</p>
    <a-row :gutter="32">
      <a-col :span="5">
        <a-input placeholder v-model="postcode" ref="postcode"/>
      </a-col>
    </a-row>
    <p class="vertical-space">Your membership fee will be: {{ getMembershipFee }}</p>
    <div class="vertical-space">
      <a-button
        type="primary"
        icon="plus"
        :loading="loadingSubmission"
        @click="createFlatbond"
      >Submit</a-button>
    </div>
    {{ config.fixed_membership_fee_amount }}
  </div>
</template>

<script>
import createFlatbondMutation from '../../apollo/mutations/createFlatbond.gql'
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

  data() {
    return {
      rentPeriod: 'monthly',
      rent: 800,
      postcode: '',
      loadingSubmission: false,
      myConfig: {
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 0,
      }
    }
  },
  computed: {
    getMembershipFee() {
      const VAT = 1.2 // 20% VAT
      if (this.myConfig.fixed_membership_fee)
        return this.myConfig.fixed_membership_fee_amount * VAT

      let membershipFee =
        this.rentPeriod === 'monthly' ? this.rent / 4 : this.rent
      membershipFee = membershipFee * VAT
      membershipFee = this.round(membershipFee)

      const minimumFee = 120 * VAT
      if (membershipFee < minimumFee) membershipFee = minimumFee

      return membershipFee
    },
    clientId() {
      return parseInt(this.$route.params.client_id)
    }
  },

  watch: {
    downloadedConfig(value) {
      console.log('CONFIG LOADED')
      console.log(value)
      if (typeof value === 'undefined') return
      this.myConfig = value
    }
  },

  methods: {
    round(num) {
      // Round always, even a num like 1.5 => 1.50
      // source: https://stackoverflow.com/a/12830454
      return num.toFixed(2)
    },
    toPence(num) {
      // source: https://stackoverflow.com/a/8388483
      const pence = num * 100
      const asInteger = parseInt(pence, 10)
      return asInteger
    },
    async createFlatbond() {
      //   if (!this.validateInputs()) return
      this.loadingSubmission = true

      const newFlatbond = {
        rent: this.toPence(this.rent),
        postcode: this.postcode,
        client_id: this.client_id,
        membership_fee: this.toPence(this.getMembershipFee)
      }

      try {
        const mutation = await this.$apollo.mutate({
          mutation: createFlatbondMutation,
          variables: newFlatbond
        })

        const flatbond = mutation.data.createFlatbond
        console.log('Flatbond:', flatbond)
        this.loadingSubmission = false
        this.redirectToDetailsPage(flatbond)
      } catch (error) {
        console.error(error)
        this.openNotification('error', error)
        this.loadingSubmission = false
      }
    },
    validateInputs() {
      if (this.postcode.length < 5) {
        this.openNotification('error', 'Postcode is too short')
        return false
      }

      return true
    },
    openNotification(type, title) {
      this.$notification[type]({
        message: title
      })
    },
    redirectToDetailsPage(flatbond) {
      this.$store.commit('SET_FLATBOND', flatbond)
      this.$router.push({
        path: 'details'
      })
    }
  }
}
</script>

<style scoped>
.vertical-space {
  margin-top: 15px;
}
</style>
