<template lang='pug'>
.container.login
  h1 Login
  GoogleLogin
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoogleLogin from '@/components/GoogleLogin.vue';

@Component({
  components: {
    GoogleLogin,
  },
})
export default class Login extends Vue {}
</script>
