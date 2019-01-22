<template>
  <a-card :bordered="false">
    <!-- TITLE -->
    <a-row>
      <a-col :span="24">
        <h1>Create a flatbond for client {{ clientId }}</h1>
      </a-col>
    </a-row>

    <!-- FIXED MEMBERSHIP FEE: YES / NO -->
    <a-row class="vertical-space">
      <a-col :span="6">
        <p>Do you have a fixed membership fee?</p>
      </a-col>
      <a-col :span="6">
        <a-radio-group v-model="myConfig.fixed_membership_fee" disabled button-style="solid">
          <a-radio-button :value="true">
            Yes
          </a-radio-button>
          <a-radio-button :value="false">
            No
          </a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>

    <!-- RENT AMOUNT -->
    <a-row v-show="!myConfig.fixed_membership_fee" class="vertical-space">
      <a-col :span="6">
        <p>How much is your rent (in pounds)?</p>
      </a-col>
      <a-col :span="6">
        <a-input-number
          ref="rent"
          v-model="rent"
          :min="rentPeriod === 'monthly' ? 110 : 25"
          :max="rentPeriod === 'monthly' ? 8660 : 2000"
          auto-focus
        >
          <a-icon slot="prefix" type="pound" />
        </a-input-number>
      </a-col>
    </a-row>

    <!-- RENT AMOUNT: WEEKLY OR MONTHLY -->
    <a-row v-show="!myConfig.fixed_membership_fee" class="vertical-space">
      <a-col :span="6" />
      <a-col :span="6">
        <div>
          <a-radio-group v-model="rentPeriod">
            <a-radio-button value="weekly">
              Weekly
            </a-radio-button>
            <a-radio-button value="monthly">
              Monthly
            </a-radio-button>
          </a-radio-group>
        </div>
      </a-col>
    </a-row>

    <!-- POSTCODE -->
    <a-row class="vertical-space">
      <a-col :span="6">
        <p>What's your postcode?</p>
      </a-col>
      <a-col :span="6">
        <a-input id="postcode" ref="postcode" v-model="postcode" placeholder />
      </a-col>
    </a-row>

    <!-- MEMBERSHIP FEE -->
    <a-row class="vertical-space">
      <a-col :span="6">
        <p>Your membership fee will be:</p>
      </a-col>
      <a-col :span="6">
        <span id="membership-fee">
          {{ membershipFee }}
        </span>
      </a-col>
    </a-row>

    <!-- SUBMIT BUTTON -->
    <div class="vertical-space">
      <a-button
        id="submit"
        type="primary"
        icon="plus"
        :loading="loadingSubmission"
        @click="createFlatbond"
      >
        Submit
      </a-button>
    </div>
  </a-card>
</template>

<script>
import createFlatbondMutation from '../../apollo/mutations/createFlatbond.gql'
import configQuery from '../../apollo/queries/config.gql'

import { toPence, toInt } from '../../utils/maths.js'
import { getMembershipFee } from '../../utils/businessLogic.js'
import { validateFlatbond } from '../../utils/validation.js'

export default {
  // Send a GraphQL request to config(client_id) and store it in this.config
  apollo: {
    config: {
      query: configQuery,
      prefetch: ({ route }) => ({
        client_id: toInt(route.params.client_id)
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
      rentPeriod: 'monthly', // monthly or weekly
      rent: 800,
      postcode: '',
      loadingSubmission: false, // toggles the loading icon in the Submit button
      myConfig: {
        // when the API call is complete, this data is replaced with the API response
        fixed_membership_fee: false,
        fixed_membership_fee_amount: 0
      }
    }
  },
  computed: {
    membershipFee() {
      return getMembershipFee({
        fixed_membership_fee: this.myConfig.fixed_membership_fee,
        fixed_membership_fee_amount: this.myConfig.fixed_membership_fee_amount,
        rentPeriod: this.rentPeriod,
        rent: this.rent
      }) // convert it from pence into pounds
    },
    clientId() {
      return toInt(this.$route.params.client_id)
    }
  },

  watch: {
    config(value) {
      if (typeof value === 'undefined') return

      // divide the fixed amount by 100 to get it into pounds instead of pence
      value.fixed_membership_fee_amount /= 100
      this.myConfig = value
    }
  },

  methods: {
    async createFlatbond() {
      this.loadingSubmission = true

      const newFlatbond = {
        rent: toPence(this.rent),
        postcode: this.postcode,
        client_id: this.clientId,
        membership_fee: toPence(this.membershipFee)
      }

      if (!validateFlatbond(newFlatbond, this.openNotification)) {
        this.loadingSubmission = false
        return
      }

      console.log('newFlatbond: ', newFlatbond)

      try {
        const mutation = await this.$apollo.mutate({
          mutation: createFlatbondMutation,
          variables: newFlatbond
        })

        const flatbond = mutation.data.createFlatbond
        console.log('flatbond now: ', flatbond)
        this.redirectToDetailsPage(flatbond)
      } catch (error) {
        console.error('Error creating flatbond:', error)
        this.openNotification('error', 'Unable to create flatbond :(')
      } finally {
        this.loadingSubmission = false
      }
    },
    openNotification(type, title) {
      this.$notification[type]({
        message: title
      })
    },
    redirectToDetailsPage(flatbond) {
      this.$store.commit('SET_FLATBOND', flatbond)
      this.$store.commit('SET_FIXED_FEE', this.myConfig.fixed_membership_fee)
      this.$router.push({
        path: '../details'
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
