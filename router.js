import Vue from 'vue'
import Router from 'vue-router'

import Details from '~/pages/details'
import Create from '~/pages/create'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/create/:client_id',
        component: Create
      },
      {
        path: '/details',
        component: Details
      },
      {
        path: '*',
        redirect: '/create/1'
      }
    ]
  })
}
