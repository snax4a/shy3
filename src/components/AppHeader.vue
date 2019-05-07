<template lang='pug'>
header
  NavBar(v-bind:user='{ firstName: "Guest", lastName: "User", loggedIn: false, role: "student" }')
  Banner
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import Banner from '@/components/Banner.vue';

@Component({
  components: {
    NavBar, Banner
  }
})
export default class AppHeader extends Vue {}
</script>

<style scoped lang="scss">
</style>