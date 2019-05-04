<template lang='pug'>
.container.workshops
  h1 H1 Yoga Workshops in Pittsburgh
  h2 H2 This is a test
  NewsletterSubscribe(show='true')
  p P Here's some text to view
  Tweet(title='Moon Salutations Workshop', url='https://www.schoolhouseyoga.com/workshops')
  br
  AddToCalendar(label=false, title='Test Event')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NewsletterSubscribe from '@/components/NewsletterSubscribe.vue';
import Tweet from '@/components/Tweet.vue';
import AddToCalendar from '@/components/AddToCalendar.vue';

declare let window: any; // suppress window.twttr error

@Component({
  components: {
    NewsletterSubscribe, Tweet, AddToCalendar
  }
})
export default class Workshops extends Vue {
  private mounted() {
    window.twttr.widgets.load(); // call whenever using Tweet component
  }

}
</script>

<style lang="scss">
// .twitter-share-button {
  // width: 78px; // default 76px
  // height: 26px; // default 28px
// }
</style>