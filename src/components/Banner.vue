<template lang='pug'>
.banner(tabindex='-1')
  .container
    .d-flex.justify-content-between
      .class-passes
        h2 Class Passes
        h3 Treat yourself
        b-button-group
          b-button(variant='warning', @click='addItem(4)', alt='Fifteen class pass') 15
          b-button(variant='warning', @click='addItem(2)', alt='Five class pass') 5
          b-button(variant='warning', @click='addItem(1)', alt='One class pass') 1
      .d-none.d-sm-block
        h2 Teacher Training
        h3 Spread the love
        b-button(variant='warning', to='/teachertraining', alt='Yoga Teacher Training (in full)') More info
      .d-none.d-md-block
        h2 Gift Cards
        h3 The gift of good health
        b-button-group
          b-button(variant='warning', @click='addItem(8)', alt='Gift card - Fifteen classes') 15
          b-button(variant='warning', @click='addItem(6)', alt='Gift card - Five classes') 5
          b-button(variant='warning', @click='addItem(5)', alt='Gift card - One class') 1
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { store, mutations } from '@/store';

@Component
export default class Banner extends Vue {
  private addItem(product: number) {
    mutations.cartAdd(product);
    this.$router.push('cart');
  }
}
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