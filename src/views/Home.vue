<template lang='pug'>
.container.home
  .row
    .col-md-4
      .callout(v-if='announcementSections.length > 0')
        h1.heading Announcements
        div(v-for='item in announcementSections')
          h2(v-if='item.announcements.length > 0') {{ item.section }}
          p(v-for='announcement in item.announcements')
            b {{ announcement.title }} 
            | - 
            span(v-html='announcement.description')
        br
        a.btn.btn-warning(href='https://www.youtube.com/watch?v=fxuAnP2GF0I&feature=youtu.be', target='_blank') Watch our video!
    .col-md-8
      b-carousel(id='carouselFade', :interval='7000', fade='', indicators='')
        b-carousel-slide(img-src='../assets/images/home1.jpg', img-alt='Woman in handstand at one of our Pittsburgh yoga schools')
        b-carousel-slide(img-src='../assets/images/home2.jpg', img-alt='Woman in lotus at one of our Pittsburgh yoga schools')
        b-carousel-slide(img-src='../assets/images/home3.jpg', img-alt='Woman stretching at one of our Pittsburgh yoga schools')
        b-carousel-slide(img-src='../assets/images/home4.jpg', img-alt='Man in lotus at one of our Pittsburgh yoga schools')
  .row
    h1.col-md-6 Frequently-asked questions
  .row
    .faqs
      article(v-for='faq in faqs')
        h2(v-html='faq.question')
        p(v-html='faq.answer')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private mounted() {
    this.announcementsFetch();
    this.faqsFetch();
  }

  get announcementSections(): any[] {
    return this.$store.state.announcementSections;
  }

  get carousel(): string[] {
    return this.$store.state.carousel;
  }

  get faqs(): any[] {
    return this.$store.state.faqs;
  }

  private announcementsFetch() {
    this.$store.dispatch('announcementsFetch');
  }

  private faqsFetch() {
    this.$store.dispatch('faqsFetch');
  }
}
</script>

<style scoped lang="scss">
.callout {
  padding: 20px 20px 15px 20px;
  margin: 15px 0 10px 0;
  border: 1px solid #eee;
  border-left-width: 5px;
  border-radius: 3px;
  border-left-color: $shy-orange;

  h2 {
    font-size: 18px;
    margin-top: 20px;
  }

  h1.heading {
    margin-top: 0;
    font-size: 24px;
    color: orange;
  }

  div {
    p {
      margin: 5px 0 0;
    }
  }
}

h1 {
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 0;
}

h2 {
  font-size: 18px;
}

$column-gap: 3em;

/* Extra small */
@media (min-width: 300px) {
  .faqs {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    margin-left: 15px;
    margin-right: 15px;
  }
}

/* Small */
@media (min-width: 500px) {
  .faqs {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}

/* Medium */
@media (min-width: 992px) {
  .faqs {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
}

/* Large */
@media (min-width: 1200px) {
  .faqs {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
  }
}

.faqs {
  margin-top: 20px;
  -webkit-column-gap: $column-gap;
  -moz-column-gap: $column-gap;
  column-gap: $column-gap;
}

article {
  break-inside: avoid-column; // keep articles together
  page-break-inside: avoid-column!important; // bogus setting to short-circuit the loading bar's CSS
  margin-bottom: 20px;

  p {
    break-inside: avoid-column;
    margin-top: 0px;
    margin-bottom: 10px;
  }

  h2 {
    margin-bottom: 10px;
  }
}
</style>