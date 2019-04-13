<template lang='pug'>
.banner(tabindex='-1')
  .container
    .d-flex.justify-content-between
      .class-passes
        h2 Class Passes
        h3 Treat yourself
        b-button-group
          b-button.btn-warning(ng-click='$ctrl.addItem(4)', alt='Twelve class pass') 12
          b-button.btn-warning(ng-click='$ctrl.addItem(2)', alt='Four class pass') 4
          b-button.btn-warning(ng-click='$ctrl.addItem(1)', alt='One class pass') 1
      .d-none.d-sm-block
        h2 Teacher Training
        h3 Spread the love
        b-button.btn-warning(to='/teachertraining', alt='Yoga Teacher Training (in full)') More info
      .d-none.d-md-block
        h2 Gift Cards
        h3 The gift of good health
        b-button-group
          b-button.btn-warning(ng-click='$ctrl.addItem(8)', alt='Gift card - Twelve classes') 12
          b-button.btn-warning(ng-click='$ctrl.addItem(6)', alt='Gift card - Four classes') 4
          b-button.btn-warning(ng-click='$ctrl.addItem(5)', alt='Gift card - One class') 1
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {}
</script>

<style scoped lang="scss">
.banner {
	color: $shy-lavender;
  background-color: $brand-primary;
  padding: 20px 0;
	margin-bottom: 30px;

  h2, h3 {
    margin-top: 0;
    white-space: nowrap;
  }
  
	h2 {
    font-size: 18px; // change to rem
		color: #fff;
		margin-bottom: 3px;
	}

	h3 {
		font-size: 14px;
		margin-bottom: 7px;
	}

  .class-passes {
    margin-left: 195px;
  }
}

@media (max-width: 768px) {
	.class-passes {
		text-align: right;
	 } 
}
</style>