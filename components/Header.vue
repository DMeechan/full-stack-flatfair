<template>
  <a-layout-header>
    <a-menu v-model="currentRoute" mode="horizontal" theme="dark" :style="{ lineHeight: '64px' }">
      <a-row>
        <a-col :span="4">
          <a-menu-item key="branding">
              Flatbond demo by Daniel Meechan
            </a-menu-item>
        </a-col>
        <a-col :span="18"/>
        <a-col :span="2">
          <nuxt-link :to="`/create`">
            <a-menu-item key="create">
              <a-icon type="plus"/>Create a Flatbond
            </a-menu-item>
          </nuxt-link>
        </a-col>
      </a-row>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: ['create']
    }
  }
}
</script>
