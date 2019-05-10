<template lang='pug'>
span
  b-button.paynow(variant='warning', v-if='!applePayEnabled', @click='addItem(product)') Pay Now
  b-button.apple-pay-button.pull-right(v-if='applePayEnabled', @click='applePayBuyItem(product)')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mutations } from '@/store';

@Component
export default class PayNow extends Vue {
  @Prop({ default: 1 }) private product!: number;
  @Prop({ default: false }) private applePayEnabled!: boolean;

  private addItem(product: number) {
    mutations.cartAdd(product);
    this.$router.push('cart');
  }

  private applePayBuyItem(product: number) {
    mutations.cartAdd(product);
    this.$router.push('cart');
  }
}
</script>

<style scoped lang="scss">
.paynow {
  width:100px;
}
</style>
