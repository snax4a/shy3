<template lang='pug'>
.container.workshops
  h1 Yoga Workshops in Pittsburgh
  .row
    .col-sm-5
      NewsletterSubscribe(show='true')
  .row(v-for='workshop in workshops')
    .col-md-5
      b-img(:src='`https://www.schoolhouseyoga.com/api/file/${workshop.imageId}`', alt='Yoga workshop photo', fluid-grow, left=true)
    .col-md-7
      a(:id='`workshop${workshop._id}`')
      h4 {{ workshop.title }}
      p(v-html='workshop.description')
      p
        Tweet(:title='workshop.title', :url='`https://www.schoolhouseyoga.com/workshops#workshop${workshop._id}`')
      p(v-for='section in workshop.sections')
        //- paynow component
        span(v-if='section.title')
          b {{ section.title }} 
          span(v-if='section.description') {{ section.description }}
        b(v-if='!section.hideDate') {{ utils.dayAndDate(section.starts) }}  &nbsp;&nbsp;| &nbsp;&nbsp;
        span(v-if='!section.hideDate') {{ utils.amPm(section.starts) }} - {{ utils.amPm(section.ends) }} 
        | &nbsp;&nbsp;|&nbsp;&nbsp; ${{ section.price }} 
        b-link(:to='`/locations#location${section.locationId}`') {{ section.location }} 
        span(v-if='!section.hideDate') &nbsp;&nbsp;
          AddToCalendar(title='workshop.title', description='workshop.description', location='section.location', starts='section.starts', ends='section.ends', weekly='false', label='false')
        script(type='application/ld+json').
          {
            "@context":"http://schema.org/",
            "@type":"Event",
            "name":"{{ workshop.title }} / {{ section.title }}",
            "disambiguatingDescription":null,
            "location":{
              "@type":"Place",
              "name":"{{ section.location }}",
              "address":{
                "@type":"PostalAddress",
                "streetAddress":"5923 Baum Boulevard",
                "addressLocality":"Pittsburgh",
                "postalCode":"15206",
                "addressRegion":"PA",
                "addressCountry":"US"
              }
            },
            "image":"https://www.schoolhouseyoga.com/api/file/{{ workshop.imageId }}",
            "description":"{{ workshop.description }}",
            "url":"https://www.schoolhouseyoga.com/workshops#workshop{{ workshop._id }}",
            "startDate":"2019-05-10T22:30:00+00:00",
            "endDate":"2019-05-11T00:30:00+00:00",
            "offers":{
              "@type":"Offer",
              "name":"{{ workshop.title }}",
              "price":"{{ section.price }}.00",
              "priceCurrency":"USD",
              "validFrom":"2019-05-04T20:41:07.407Z",
              "priceValidUntil":"2019-05-11T00:30:00+00:00",
              "availability":"http://schema.org/InStock",
              "url":"https://www.schoolhouseyoga.com/workshops#workshop{{ workshop._id }}"
            }
          }
  //- JSON-Ld goes here

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NewsletterSubscribe from '@/components/NewsletterSubscribe.vue';
import Tweet from '@/components/Tweet.vue';
import AddToCalendar from '@/components/AddToCalendar.vue';
import utils from '@/utils';

declare let window: any; // suppress window.twttr error

@Component({
  components: {
    NewsletterSubscribe, Tweet, AddToCalendar
  }
})
export default class Workshops extends Vue {
  private utils: any = utils;

  private mounted() {
    this.workshopsFetch();
    window.twttr.widgets.load(); // call whenever using Tweet component
  }

  get workshops(): any[] {
    return this.$store.state.workshops;
  }

  private workshopsFetch() {
    this.$store.dispatch('workshopsFetch');
  }
}
</script>

<style lang="scss">
// .twitter-share-button {
  // width: 78px; // default 76px
  // height: 26px; // default 28px
// }
</style>