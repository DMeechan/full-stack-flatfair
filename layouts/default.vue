<template>
  <a-layout class="layout">
    <Header/>
    <a-layout-content style="padding 0 50px">
      <div id="content" style="background: #fff; padding: 24px; min-height: 240px">
        <nuxt/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>
