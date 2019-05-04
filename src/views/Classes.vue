<template lang='pug'>
.container.classes
  h1 Yoga Classes in Pittsburgh
  p
    b Pittsburgh Yoga Schools
  b-button-group.studios
    b-button(variant='primary', :to='`#location${location._id}`', v-for='location in locations', :key='location._id') {{ location.name }}
  .studio(v-for='studio in schedule')
    h2.studio
      b-link(:id='`location${studio.locationId}`', :href='`/locations#${studio.locationId}`') 
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
          td.col-4 {{ yogaClass.title }} 
            span(v-if='yogaClass.canceled === true') (Canceled)
          td.col-4 {{ yogaClass.teacherFirstName }} {{ yogaClass.teacherLastName }}
          //-     a(href='#', ng-click='$ctrl.classDescriptionOpen(class.title, class.description)') {{ class.title }}
          //-     a(href='#', ng-click='$ctrl.teacherOpen(class.teacherFirstName, class.teacherLastName, class.teacherImageId, class.teacherBio, class.teacherUrl)') {{ class.teacherFirstName }} {{ class.teacherLastName }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddToCalendar from '@/components/AddToCalendar.vue';

@Component({
  components: {
    AddToCalendar
  }
})

export default class Classes extends Vue {
  private mounted() {
    this.locationsFetch();
    this.scheduleFetch();
  }

  private amPm(date: Date): string {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      .replace(':00', '')
      .replace(' ', '')
      .toLowerCase();
  }

  private fullDate(date: Date): string {
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  }

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
}
</script>

<style scoped lang="scss">
  .studios {
    margin-bottom: 20px;
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