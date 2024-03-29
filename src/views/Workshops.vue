<template lang='pug'>
.container.workshops
  h1 Yoga Workshops in Pittsburgh
  .row
    .col-sm-5
      NewsletterSubscribe(show='true')
  .row.workshop(v-for='workshop in workshops')
    .col-md-5
      img.float-left.img-fluid.workshop-photo(:src='`https://www.schoolhouseyoga.com/api/file/${workshop.imageId}`', alt='Yoga workshop photo')
    .col-md-7
      a(:id='`workshop${workshop._id}`')
      h4 {{ workshop.title }}
      p(v-html='workshop.description')
      p
        Tweet(:title='workshop.title', :url='`https://www.schoolhouseyoga.com/workshops#workshop${workshop._id}`')
      p(v-for='section in workshop.sections')
        span(v-if='section.title')
          b {{ section.title }} 
          span(v-if='section.description') {{ section.description }}
        b(v-if='!section.hideDate') {{ dayAndDate(section.starts) }}  &nbsp;&nbsp;| &nbsp;&nbsp;
        span(v-if='!section.hideDate') {{ amPm(section.starts) }} - {{ amPm(section.ends) }} 
        | &nbsp;&nbsp;|&nbsp;&nbsp; ${{ section.price }}
        PayNow.float-right(:product='section.productId')
        br
        router-link(:to='`/locations#location${section.locationId}`') {{ section.location }} 
        span(v-if='!section.hideDate') &nbsp;&nbsp;
          AddToCalendar(:title='workshop.title', :description='workshop.description', :location='section.location', :starts='section.starts', :ends='section.ends', weekly=false, label='false')
        script(type='application/ld+json').
          {
            "@context":"http://schema.org/",
            "@type":"Event",
            "name":"{{ workshop.title }}",
            "disambiguatingDescription":"{{ section.title }}",
            "performer":"Schoolhouse Yoga Staff",
            "location":{
              "@type":"Place",
              "name":"{{ section.location }}",
              "address":{
                "@type":"PostalAddress",
                "streetAddress":"{{ section.streetAddress }}",
                "addressLocality":"{{ section.addressLocality }}",
                "postalCode":"{{ section.postalCode }}",
                "addressRegion":"{{ section.addressRegion }}",
                "addressCountry":"{{ section.addressCountry }}"
              }
            },
            "image":"https://www.schoolhouseyoga.com/api/file/{{ workshop.imageId }}",
            "description":"{{ workshop.description }}",
            "url":"https://www.schoolhouseyoga.com/workshops#workshop{{ workshop._id }}",
            "startDate":"{{ section.starts }}",
            "endDate":"{{ section.ends }}",
            "offers":{
              "@type":"Offer",
              "name":"{{ workshop.title }}",
              "price":"{{ section.price }}.00",
              "priceCurrency":"USD",
              "validFrom":"{{ nowAsIso() }}",
              "priceValidUntil":"{{ section.ends }}",
              "availability":"http://schema.org/InStock",
              "url":"https://www.schoolhouseyoga.com/workshops#workshop{{ workshop._id }}"
            }
          }
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { store, mutations } from '@/store';
import NewsletterSubscribe from '@/components/NewsletterSubscribe.vue';
import Tweet from '@/components/Tweet.vue';
import AddToCalendar from '@/components/AddToCalendar.vue';
import PayNow from '@/components/PayNow.vue';
import { dayAndDate, amPm, nowAsIso } from '@/utils';
import { Workshop } from '@/types';

declare let window: any; // suppress window.twttr error

@Component({
  components: {
    NewsletterSubscribe, Tweet, AddToCalendar, PayNow
  }
})
export default class Workshops extends Vue {
  private amPm(date: Date): string {
    return amPm(date);
  }

  private async created(): Promise<void> {
    await mutations.workshopsSet();
    window.twttr.widgets.load(); // call whenever using Tweet component
  }

  private dayAndDate(date: Date): string {
    return dayAndDate(date);
  }

  private nowAsIso(): string {
    return nowAsIso();
  }

  private get workshops(): Workshop[] {
    return store.workshops;
  }
}
</script>

<style scoped lang="scss">
.workshop {
  margin-top: 3rem;
}

.workshop-photo {
  margin-bottom: 5px;
}
</style>