<template lang='pug'>
button.btn.btn-warning.btn-lg.google(@click='login()')
  img(src='/img/google.svg')
  |  Login with Google
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GoogleLogin extends Vue {
  private login() {
    // Use Google's non-redirect method of authenticating
  }
}
</script>

<style scoped lang="scss">
img {
  height: 21px;
  width: 21px;
  position: relative;
  top: -1px;
  left: -2px;
  margin: 0;
}
</style>