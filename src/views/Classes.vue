<template lang='pug'>
.container.classes
  h1 Yoga Classes in Pittsburgh
  p
    b Pittsburgh Yoga Schools
    br
    b-button-group
      b-button(variant='primary', :to='`#location${location._id}`', v-for='location in locations', :key='location._id') {{ location.name }}
  .row
    .col-md-8
      .studio(v-for='studio in schedule')
        h2.studio
          b-link(:id='`location${studio.locationId}`', :href='`/locations#${studio.locationId}`') 
            fa(icon='map-marker-alt')
            | &nbsp;{{ studio.location }}
        .day(v-for='day in studio.days')
          strong {{ fullDate(day.date) }}
          table.table.table-striped.table-hover
            tr.row(v-for='yogaClass in day.classes')
              td.col-4 {{ amPm(yogaClass.startTime) }}-{{ amPm(yogaClass.endTime) }}
              td.col-4 {{ yogaClass.title }}
              td.col-4 {{ yogaClass.teacherFirstName }} {{ yogaClass.teacherLastName }}
          //- td.day(colspan='3') {{ day.date | date:'fullDate' }}
          //- tr(ng-repeat-end, ng-repeat='class in day.classes')
          //-   td.time(ng-class='{ canceled: class.canceled===true }')
          //-     addtocalendar(title='class.title', description='class.teacher', location='studio.location', starts='class.startTime', ends='class.endTime', weekly='true', mini='true') 
          //-     | &nbsp;{{ class.startTime | date:'shortTime' }}-{{ class.endTime | date:'shortTime' }}
          //-   td(ng-class='{ canceled: class.canceled===true }')
          //-     a(href='#', ng-click='$ctrl.classDescriptionOpen(class.title, class.description)') {{ class.title }}
          //-     span(ng-if='class.canceled===true') (Canceled)
          //-     span(ng-if='class.showDescription')
          //-       br
          //-       | {{ class.description }}
          //-   td(ng-class='{ canceled: class.canceled===true }') 
          //-     a(href='#', ng-click='$ctrl.teacherOpen(class.teacherFirstName, class.teacherLastName, class.teacherImageId, class.teacherBio, class.teacherUrl)') {{ class.teacherFirstName }} {{ class.teacherLastName }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Classes extends Vue {
  private mounted() {
    this.locationsFetch();
    this.scheduleFetch();
  }

  private amPm(date: Date): string {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).replace(':00', '').replace(' ', '').toLowerCase();
  }

  private fullDate(date: Date): string {
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options)
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
</style>