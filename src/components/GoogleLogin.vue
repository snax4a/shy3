<template lang='pug'>
b-button(@click='login()', variant='warning', size='lg')
  img.img-google(src='/img/google.svg')
  |  Google Login
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class GoogleLogin extends Vue {
  @Prop({ default: 'a workshop' }) private title!: string;
  @Prop({ default: 'https://www.schoolhouseyoga.com/workshops' }) private url!: string;
  login() {
    console.log('Logged in');
  }
}
</script>

<style scoped lang="scss">
.btn-warning:hover {
  background-position: 0 -42px;
}

.img-google {
  height: 21px;
  width: 21px;
  position: relative;
  top: -1px;
  left: -2px;
  margin: 0;
}
</style>