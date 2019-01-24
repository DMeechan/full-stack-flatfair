<template>
  <a-layout class="layout" style="height: 100vh;">
    <Header />
    <a-layout-content class="layout-content">
      <div class="content-wrapper">
        <nuxt />
      </div>
    </a-layout-content>
    <a-layout-footer />
  </a-layout>
</template>

<script>
import Header from '~/components/header'

export default {
  components: {
    Header
  }
}
</script>

<style>
html {
  min-height: 100%; /* temporary fix to stretch page to bottom */
}
.layout-content {
  padding: 0 50px;
}
.content-wrapper {
  background: #fff;
  padding: 24px;
  min-height: 280px;
  margin-top: 40px;
}
</style>
