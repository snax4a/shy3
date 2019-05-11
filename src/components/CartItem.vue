<template lang='pug'>
tr
  td.align-middle {{ item.productName }}
  td.align-middle.text-right ${{ item.price }}
  td.align-middle
    b-form-input.text-right(@change='quantityChange', v-model.number='item.quantity', name='quantity', type='number', maxlength='2', min='1', max='10', step='1', aria-describedby='quantityFeedback', :class='{ "is-invalid": $v.item.quantity.$error }')
    b-form-invalid-feedback(id='quantityFeedback', v-if='$v.item.quantity.$invalid') Value between 1 and 10
  td.align-middle.text-right
      strong ${{ item.total }}
  td.align-middle
    a(@click='itemDelete')
      fa.has-error(:icon='["far", "trash-alt"]')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { required, integer, between } from 'vuelidate/lib/validators';
import { store, mutations } from '@/store';
import { Item } from '@/types';

@Component({
  validations: {
    item: {
      quantity: { required, integer, between: between(1, 10) }
    }
  }
})
export default class CartItem extends Vue {
  @Prop({ default: { productId: 1, quantity: 1 }}) private item!: Item;

  private itemDelete(): void {
    mutations.cartItemDelete(this.item);
  }

  private quantityChange(): void {
    this.$v.item.$touch();
    this.item.total = this.item.quantity * this.item.price;
    mutations.cartRecalculate();
  }
}
</script>

<style scoped lang="scss">
</style>
