<template lang='pug'>
footer
  .container
    .row
      .col-xs-12.col-sm-6.col-md-7.col-lg-6.left
        a.btn.social(href='/classes', alt='Schedule for Yoga Classes in Squirrel Hill, East Liberty, and North Hills')
          span.far.fa-calendar-alt.fa-2x
        a.hidden-xs(href='/classes', alt='Class Schedule', style='margin-right: 20px;') Class Schedule
        a.btn.social(href='/locations', alt='Directions to our Pittsburgh yoga schools')
          span.fas.fa-map-marker-alt.fa-2x
        span.hidden-sm.hidden-xs
          a(href='/locations#squirrelhill', alt='Directions to Squirrel Hill school') Squirrel Hill
          a(href='/locations#eastliberty', alt='Directions to East Liberty school') East Liberty
          a(href='/locations#northhills', alt='Directions to North Hills school') North Hills
        div.xs-visible(style='margin-top:10px;')
      .col-xs-12.col-sm-6.col-md-5.col-lg-offset-1.right
        a.btn.social(href='https://twitter.com/schoolhouseyoga', alt='Twitter', target='_blank') 
          span.fab.fa-twitter.fa-2x
        a.btn.social(href='https://facebook.com/schoolhouseyoga', alt='Facebook', target='_blank') 
          span.fab.fa-facebook-f.fa-2x
        a.btn.social(href='https://instagram.com/schoolhouseyoga', alt='Instagram', target='_blank') 
          span.fab.fa-instagram.fa-2x
        a.btn.social(href='https://www.youtube.com/watch?v=fxuAnP2GF0I&feature=youtu.be', alt='YouTube', target='_blank') 
          span.fab.fa-youtube.fa-2x
    .row &nbsp;
    .row
      .col-xs-12.col-sm-6.left &copy; 2019 Schoolhouse Yoga, Inc. - All Rights Reserved
      .col-xs-12.col-sm-6.right
        a(href='/privacy', alt='Privacy Policy') Privacy Policy
        a(href='/terms', alt='Terms of use') Terms of Use
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {}
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

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

a.social {
	padding: 10px 0 0 0;
	// margin-bottom: 10px;
	width: 50px;
	height: 50px;
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

@media (max-width: 768px) {
	.col-xs-12.right, .col-xs-12.left {
			text-align: center;
	 } 
}
</style>