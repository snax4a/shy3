<template lang='pug'>
.container.locations
  h1 Pittsburgh Yoga Studio Locations
  .row.location(v-for='location in locations')
    .col-sm-3
      address
        a(:id='`location${location._id}`')
        h2 {{ location.name }}
        |  {{ location.address }}
        br
        |  {{ location.city }}, {{ location.state }} {{ location.zipCode }}
      |  
      a.btn.btn-warning(:href='location.directions', target='_blank') Directions
      a.btn.btn-primary.review(:href='location.review', target='_blank') Review Us
      br
      br
      p {{ location.note1 }}
      p {{ location.note2 }}
      br
    .col-sm-9
      .map-responsive
        iframe(:src='location.map', width='600', height='450', frameborder='0', style='border:0', allowfullscreen='')
      .map-responsive
        iframe(:src='location.street', width='600', height='450', frameborder='0', style='border:0', allowfullscreen='')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { store, mutations } from '@/store';

@Component
export default class Locations extends Vue {
  private async created(): Promise<void> {
    return await mutations.locationsSet();
  }

  private get locations(): any[] {
    return store.locations;
  }
}
</script>

<style lang="scss">
h4 {
  white-space: nowrap;
}

.location {
  margin-top: 30px;
}

.review {
  margin-left: 5px;
}

.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height:0;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
}
</style>