<template lang='pug'>
#app
  AppHeader
  router-view
  AppFooter
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/AppHeader.vue'; // @ is an alias to /src
import AppFooter from '@/components/AppFooter.vue';

@Component({
  components: {
    AppHeader, AppFooter
  }
})
export default class App extends Vue {}
</script>