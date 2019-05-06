<template lang='pug'>
span
  b-button.paynow(variant='warning', v-if='!applePayEnabled', @click='addItem(product)') Pay Now
  b-button.apple-pay-button.pull-right(v-if='applePayEnabled', @click='applePayBuyItem(product)')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PayNow extends Vue {
  @Prop({ default: 1 }) private product!: number;
  @Prop({ default: false }) private applePayEnabled!: boolean;

  private addItem(product: number) {
    this.$router.push('cart');
    alert(product);
  }

  private applePayBuyItem(product: number) {
    this.$router.push('cart');
    alert(product);
  }
}
</script>

<style scoped lang="scss">
.paynow {
  width:100px;
}
</style>
