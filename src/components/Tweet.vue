<template lang='pug'>
a.twitter-share-button(:data-text='"Join me for " + title', :data-url='url', data-size='large', href='https://twitter.com/intent/tweet') Tweet
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Tweet extends Vue {
  @Prop({ default: 'a workshop' }) private title!: string;
  @Prop({ default: 'https://www.schoolhouseyoga.com/workshops' }) private url!: string;
}
</script>
