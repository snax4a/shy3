<template lang='pug'>
footer
  .container
    .row
      .col-sm-5.col-md-7.col-lg-8.text-center.text-sm-left
        a.btn.social(href='/classes', alt='Schedule for Yoga Classes in Squirrel Hill, East Liberty, and North Hills')
          fa.fa-2x(icon='calendar-alt')
        a.d-none.d-md-inline.schedule(href='/classes', alt='Class Schedule') Class Schedule
        a.btn.social(href='/locations', alt='Directions to our Pittsburgh yoga schools')
          fa.fa-2x(icon='map-marker-alt')
        span.d-none.d-lg-inline
          a(href='/locations#squirrelhill', alt='Directions to Squirrel Hill school') Squirrel Hill
          a(href='/locations#eastliberty', alt='Directions to East Liberty school') East Liberty
          a(href='/locations#northhills', alt='Directions to North Hills school') North Hills
        .spacer.d-block
      .col-sm-7.col-md-5.col-lg-4.text-center.text-sm-right
        a.btn.social(href='https://twitter.com/schoolhouseyoga', alt='Twitter', target='_blank') 
          fa.fa-2x(:icon='["fab", "twitter"]')
        a.btn.social(href='https://facebook.com/schoolhouseyoga', alt='Facebook', target='_blank') 
          fa.fa-2x(:icon='["fab", "facebook-f"]')
        a.btn.social(href='https://instagram.com/schoolhouseyoga', alt='Instagram', target='_blank') 
          fa.fa-2x(:icon='["fab", "instagram"]')
        a.btn.social(href='https://www.youtube.com/watch?v=fxuAnP2GF0I&feature=youtu.be', alt='YouTube', target='_blank') 
          fa.fa-2x(:icon='["fab", "youtube"]')
    .row &nbsp;
    .row
      .col-md-6.text-center.text-md-left &copy; 2019 Schoolhouse Yoga, Inc. - All Rights Reserved
      .col-md-6.text-center.text-md-right
        a(href='/privacy', alt='Privacy Policy') Privacy Policy
        a(href='/terms', alt='Terms of use') Terms of Use
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {}
</script>

<style scoped lang="scss">
footer {
	margin-top: 30px;
	margin-bottom: 0;
	padding: 40px 0;
	text-align: left;
	background-color: $brand-primary;
	color: $shy-lavender;
}

.footer-text {
	margin-top: 25px;
}

footer a {
	margin-right: 15px;
	color: $shy-lavender;
}

footer a:hover {
	color: #fff;
}

.schedule {
  margin-right: 20px;
}

.spacer {
  margin-top:10px;
}

a.social {
	padding: 10px 0 0 0;
	// margin-bottom: 10px;
	width: 54px;
	height: 54px;
	border-radius: 50%;
	border-width: 1px;
	background-color: $shy-lavender;
	border-color: $shy-lavender;
	color: $brand-primary;
}

a.social:hover {
	color: $brand-primary;
	background-color: #fff;
	border-color: #fff;
}
</style>