<template lang='pug'>
b-dropdown.add-to-calendar(variant='outline-primary', v-if='!edge')
  template(slot='button-content')
    fa(:icon='["far", "calendar-plus"]') 
    span(v-if='label')
      | &nbsp;Add to Calendar
  b-dropdown-item(:href='icsFile', download='event.ics', target='_blank')
    fa(:icon='["fab", "apple"]')
    | &nbsp;&nbsp;Apple Calendar
  b-dropdown-item(:href='icsFile', download='event.ics', target='_blank')
    fa(:icon='["fab", "windows"]')
    | &nbsp;&nbsp;Microsoft Outlook
  b-dropdown-item(:href='googleCalendarUrl', target='_blank')
    fa(:icon='["fab", "google"]')
    | &nbsp;&nbsp;Google Calendar
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AddToCalendar extends Vue {
  @Prop({ default: false }) private label!: boolean;
  @Prop({ default: 'Event title' }) private title!: string;
  @Prop({ default: 'Description' }) private description!: string;
  @Prop({ default: 'Location' }) private location!: string;
  @Prop({ default: '2020-01-01T10:30' }) private starts!: string;
  @Prop({ default: '2020-01-01T11:00' }) private ends!: string;
  @Prop({ default: false }) private weekly!: boolean;
  @Prop({ default: window.navigator.userAgent.indexOf('Edge') > -1 }) private edge!: boolean;

  get googleCalendarUrl(): string {
    // tslint:disable-next-line
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(this.title)}&dates=${this.iCalUTC(this.starts)}/${this.iCalUTC(this.ends)}&details=${encodeURIComponent(this.description)}&location=${encodeURIComponent(this.location)}${this.weekly ? '&recur=RRULE:FREQ=WEEKLY' : ''}`;
  }

  get icsFile(): string {
      /* tslint:disable */
      const iCal = encodeURIComponent(`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Schoolhouse Yoga, Inc.//Website//EN
BEGIN:VEVENT
UID:${Math.random().toString(36).substr(2)}
DTSTAMP:${moment().format('YYYYMMDDTHHmmss')}
DTSTART:${this.iCalUTC(this.starts)}
DTEND:${this.iCalUTC(this.ends)}${this.weekly ? '\nRRULE:FREQ=WEEKLY;WKST=SU' : ''}
SUMMARY:${this.iCalText(this.title, 250)}
LOCATION:${this.iCalText(this.location, 250)}
DESCRIPTION:${this.iCalText(this.description, 1024)}
BEGIN:VALARM
TRIGGER:-P120M
ACTION:AUDIO
ATTACH;VALUE=URI:Chord
END:VALARM
END:VEVENT
END:VCALENDAR`);
    return `data:text/calendar;charset=utf-8,${iCal}`;
    /* tslint:enable */
  }

  private iCalUTC(isoDate: string) {
    return moment(isoDate, moment.ISO_8601).format('YYYYMMDDTHHmmss');
  }

  private iCalText(str: string, maxLength: number): string {
    if (!str) {
      return '';
    }
    str = str.replace(/\n/g, '\\n'); // escape line breaks
    str = str.substring(0, maxLength || 250);
    return str;
  }
}
</script>

<style lang="scss">
.add-to-calendar {
  margin-right: 5px;
}

.add-to-calendar > .btn-outline-primary {
  border-color: #fff;
  padding: 0;
}
</style>