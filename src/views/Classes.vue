<template lang='pug'>
.container.classes
  h1 Yoga Classes in Pittsburgh
  p
    b Pittsburgh Yoga Schools
  b-button-group.studios
    b-button(variant='primary', :href='`#location${location._id}`', v-for='location in locations', :key='location._id') {{ location.name }}
  .studio(v-for='studio in schedule')
    h2.studio
      b-link(:id='`location${studio.locationId}`', :href='`/locations#location${studio.locationId}`') 
        fa(icon='map-marker-alt') 
        | &nbsp;{{ studio.location }}
    .day(v-for='day in studio.days')
      .day-name
        strong {{ utils.fullDate(day.date) }}
      table.table
        tr.row(v-for='yogaClass in day.classes', :class='yogaClass.canceled === true ? "strikethrough": ""')
          td.col-4(:class='') 
              AddToCalendar(label=false, :title='yogaClass.title', :description='yogaClass.description', :location='yogaClass.location', :starts='yogaClass.startTime', :ends='yogaClass.endTime', weekly='true')
              | {{ utils.amPm(yogaClass.startTime) }}-{{ utils.amPm(yogaClass.endTime) }}
          td.col-4
            b-link(v-b-modal='"classModal"', @click='sendToModal(yogaClass)') {{ yogaClass.title }} 
            span(v-if='yogaClass.canceled === true') (Canceled)
          td.col-4
            b-link(v-b-modal='"teacherModal"', @click='sendToModal(yogaClass)') {{ yogaClass.teacherFirstName }} {{ yogaClass.teacherLastName }}
  b-modal(id='classModal', :title='modalRecord.title', ok-only=true)
    p {{ modalRecord.description }}
  b-modal(id='teacherModal', :title='`${modalRecord.teacherFirstName} ${modalRecord.teacherLastName}`', ok-only=true)
    .col-6
      b-img(v-if='modalRecord.teacherImageId', :src='`https://www.schoolhouseyoga.com/api/file/${modalRecord.teacherImageId}`', :alt='`${modalRecord.teacherFirstName} ${modalRecord.teacherLastName}`', fluid-grow, left=true)
    p {{ modalRecord.teacherBio }}
    b-link(v-if='modalRecord.teacherUrl', target='_blank', :href='modalRecord.teacherUrl') Visit {{ modalRecord.teacherFirstName }}'s website.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddToCalendar from '@/components/AddToCalendar.vue';
import utils from '@/utils';

@Component({
  components: {
    AddToCalendar
  }
})

export default class Classes extends Vue {
  private modalRecord: any = {};
  private utils: any = utils;

  private mounted() {
    this.locationsFetch();
    this.scheduleFetch();
  }

  // private amPm(date: Date): string {
  //   return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  //     .replace(':00', '')
  //     .replace(' ', '')
  //     .toLowerCase();
  // }

  // private fullDate(date: Date): string {
  //   const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //   return date.toLocaleString('en-US', options);
  // }

  private locationsFetch() {
    this.$store.dispatch('locationsFetch');
  }

  get locations(): any[] {
    return this.$store.state.locations;
  }

  get schedule(): any[] {
    return this.$store.state.schedule;
  }

  private scheduleFetch() {
    this.$store.dispatch('scheduleFetch');
  }

  private sendToModal(record: any) {
    this.modalRecord = record;
  }
}
</script>

<style scoped lang="scss">
  .studios {
    margin-bottom: 20px;
  }

  .col-6 {
    padding-left: 0;
  }

  .img-fluid {
    margin-top:0px;
    border: 1px solid lightgray;
    margin-bottom: 10px;
    margin-right: 15px;
  }

  h2 {
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .day-name {
    margin-bottom: 5px;
  }

  .strikethrough {
    text-decoration: line-through;
  }
</style>