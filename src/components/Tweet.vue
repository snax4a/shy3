<template lang='pug'>
a.twitter-share-button(:data-text='title', :data-url='url', data-size='large', href='https://twitter.com/intent/tweet') Tweet
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Tweet extends Vue {
  @Prop({ default: 'a workshop' }) private title!: string;
  @Prop({ default: 'https://www.schoolhouseyoga.com/workshops' }) private url!: string;
}
</script>

<style scoped lang="scss">
.twitter-share-button {
  width: 78px;
  height: 26px;
}
</style>