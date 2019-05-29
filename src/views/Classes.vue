<template lang='pug'>
.container.classes
  h1 Yoga Classes in Pittsburgh
  p
    b Pittsburgh Yoga Schools
  .btn-group.studios
    a.btn.btn-primary(:href='`#location${location._id}`', v-for='location in locations', :key='location._id') {{ location.name }}
  .studio(v-for='studio in schedule')
    h2.studio
      router-link(:id='`location${studio.locationId}`', :to='`/locations#location${studio.locationId}`') 
        fa(icon='map-marker-alt') 
        | &nbsp;{{ studio.location }}
    .day(v-for='day in studio.days')
      .day-name
        strong {{ fullDate(day.date) }}
      table.table
        tr.row(v-for='yogaClass in day.classes', :class='yogaClass.canceled === true ? "strikethrough": ""')
          td.col-4(:class='') 
              AddToCalendar(label=false, :title='yogaClass.title', :description='yogaClass.description', :location='yogaClass.location', :starts='yogaClass.startTime', :ends='yogaClass.endTime', weekly='true')
              | {{ amPm(yogaClass.startTime) }}-{{ amPm(yogaClass.endTime) }}
          td.col-4
            a(v-b-modal='"classModal"', href='#', @click='sendToModal(yogaClass)') {{ yogaClass.title }} 
            span(v-if='yogaClass.canceled === true') (Canceled)
          td.col-4
            a(v-b-modal='"teacherModal"', href='#', @click='sendToModal(yogaClass)') {{ yogaClass.teacherFirstName }} {{ yogaClass.teacherLastName }}
  b-modal(id='classModal', :title='modalRecord.title', ok-only=true)
    p {{ modalRecord.description }}
  b-modal(id='teacherModal', :title='`${modalRecord.teacherFirstName} ${modalRecord.teacherLastName}`', ok-only=true)
    .col-6
      img.float-left.img-fluid(v-if='modalRecord.teacherImageId', :src='`https://www.schoolhouseyoga.com/api/file/${modalRecord.teacherImageId}`', :alt='`${modalRecord.teacherFirstName} ${modalRecord.teacherLastName}`')
    p {{ modalRecord.teacherBio }}
    a(v-if='modalRecord.teacherUrl', target='_blank', :href='modalRecord.teacherUrl') Visit {{ modalRecord.teacherFirstName }}'s website.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { store, mutations } from '@/store';
import AddToCalendar from '@/components/AddToCalendar.vue';
import { fullDate, amPm } from '@/utils';

@Component({
  components: {
    AddToCalendar
  }
})

export default class Classes extends Vue {
  private modalRecord: any = {};

  private amPm(date: Date): string {
    return amPm(date);
  }

  private async created(): Promise<[void, void]> {
    return await Promise.all([mutations.locationsSet(), mutations.scheduleSet()]);
  }

  private fullDate(date: Date): string {
    return fullDate(date);
  }

  private get locations(): any[] {
    return store.locations;
  }

  private get schedule(): any[] {
    return store.schedule;
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