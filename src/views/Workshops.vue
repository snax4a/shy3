<template lang='pug'>
.container.workshops
  h1 H1 Yoga Workshops in Pittsburgh
  h2 H2 This is a test
  p P Here's some text to view
  Tweet(title='Moon Salutations Workshop', url='https://www.schoolhouseyoga.com/workshops')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Tweet from '@/components/Tweet.vue';

@Component({
  components: {
    Tweet,
  },
})
export default class Workshops extends Vue {}
</script>