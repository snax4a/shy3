<template lang='pug'>
.container
  #nav
    router-link(to='/') Home
    |  | 
    router-link(to='/about') About
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {}
</script>

<style scoped lang="scss">
</style>