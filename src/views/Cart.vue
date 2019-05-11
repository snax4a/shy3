<template lang='pug'>
.container.cart
  h1 Shopping Cart
  .row
    .col-md-6
      b-form(novalidate='')
        .card
          .card-header {{ count > 0 ? count : 'No' }} items in your cart
          .card-body
            table.table.table-striped.table-hover.table-borderless
              thead
                tr
                  th What
                  th Each
                  th.text-center Qty
                  th.text-right Amount
                  th &nbsp;
              tbody
                tr(v-if='count == 0')
                  td(colspan='5') &nbsp;
                CartItem(v-for='item in items', :item='item', :key='item.productId')
              tfoot
                tr
                  td.text-right(colspan='4')
                    strong Total&nbsp;&nbsp;${{ total }}
                  td &nbsp;
          .card-footer.d-flex.justify-content-between
            b-button(variant='primary', @click='keepShopping') Keep Shopping
            b-button(variant='warning', @click='checkout', :disabled='count == 0') Checkout »
    .col-md-6
      b-form(@submit.prevent='onSubmit', novalidate='', autocomplete='on')
        .card
          .card-header Payment Info
          .card-body
            .row(v-if='applePayEnabled')
              .col-12.pb-2
                a.apple-pay-button(ng-click='$ctrl.applePayCheckout()')
                br
                | Or fill out the form below to use a credit card.
            .row
              b-form-group.col-xs-12.col-sm-7.col-lg-6(label='Credit card number', label-for='card-number')
                .input-group.mb-0
                  .form-control(id='card-number')
                  .input-group-append
                    .span.input-group-text
                      fa(:icon='["far", "credit-card"]')
                b-form-invalid-feedback(id='creditCardFeedback', v-if='paymentSubmitted && $v.creditCard.$invalid') Please provide a valid card number.
              b-form-group.col-xs-7.col-sm-5.col-lg-4(label='Expires', label-for='expiration-date')
                .input-group.mb-0
                  .form-control(id='expiration-date')
                  .input-group-append
                    .span.input-group-text
                      fa(icon='calendar-alt')
                b-form-invalid-feedback(id='expirationFeedback', v-if='paymentSubmitted && $v.expiration.$invalid') Please provide a valid expiration date.
              b-form-group.col-xs-5.col-md-4(label='CVV', label-for='cvv')
                .input-group.mb-0
                  .form-control(id='cvv')
                  .input-group-append
                    .span.input-group-text
                      fa(icon='lock')
                b-form-invalid-feedback(id='cvvFeedback', v-if='paymentSubmitted && $v.cvv.$invalid') Please provide a valid card security code.
            .row
              b-form-group.col-xs-12.col-sm-6(:label='`${gift ? "Purchaser" : "Student"}\'s first name`', label-for='purchaserFirstName')
                b-form-input(v-model='purchaser.firstName', type='text', id='purchaserFirstName', placeholder='First name', autocomplete='cc-given-name', maxlength='20', aria-describedby='purchaserFirstNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.purchaser.firstName.$error }')
                b-form-invalid-feedback(id='purchaserFirstNameFeedback', v-if='paymentSubmitted && $v.purchaser.firstName.$invalid') This is a required field.
              b-form-group.col-xs-12.col-sm-6(label='Last name', label-for='purchaserLastName')
                b-form-input(v-model='purchaser.lastName', type='text', id='purchaserLastName', placeholder='Last name', autocomplete='cc-family-name', maxlength='20', aria-describedby='purchaserLastNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.purchaser.lastName.$error }')
                b-form-invalid-feedback(id='purchaserLastNameFeedback', v-if='paymentSubmitted && $v.purchaser.lastName.$invalid') This is a required field.
            .row
              b-form-group.col-xs-12.col-sm-7(label='Email', label-for='purchaserEmail')
                b-form-input(v-model='purchaser.email', type='email', id='purchaserEmail', placeholder='Email address', autocomplete='email', maxlength='80', aria-describedby='purchaserEmailFeedback', :class='{ "is-invalid": paymentSubmitted && $v.purchaser.email.$error }')
                b-form-invalid-feedback(id='purchaserEmailFeedback', v-if='paymentSubmitted && $v.purchaser.email.$invalid') Please provide a valid email address.
              b-form-group.col-xs-12.col-sm-5(label='Phone', label-for='purchaserPhone')
                b-form-input(v-model='purchaser.phone', type='tel', id='purchaserPhone', placeholder='Phone', autocomplete='tel-national', maxlength='23', aria-describedby='purchaserPhoneFeedback', :class='{ "is-invalid": paymentSubmitted && $v.purchaser.phone.$error }')
                b-form-invalid-feedback(id='purchaserPhoneFeedback', v-if='paymentSubmitted && $v.purchaser.phone.$invalid') Please provide a phone number.
            b-form-group(label='Instructions', label-for='instructions')
              b-form-textarea(v-model='instructions', id='instructions', rows='2', cols='20', placeholder='Instructions for this purchase')
            b-form-checkbox(v-model='gift', @click='focusOnRecipient') This is a gift
            fieldset(v-if='gift')
              .row.mt-2
                b-form-group.col-xs-12.col-sm-6(label='Student\'s first name', label-for='recipientFirstName')
                  b-form-input(v-model='recipient.firstName', type='text', id='recipientFirstName', placeholder='First name', autocomplete='given-name', maxlength='20', aria-describedby='recipientFirstNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.firstName.$error }')
                  b-form-invalid-feedback(id='recipientFirstNameFeedback', v-if='paymentSubmitted && $v.recipient.firstName.$invalid') Please provide the recipient's first name
                b-form-group.col-xs-12.col-sm-6(label='Last name', label-for='recipientLastName')
                  b-form-input(v-model='recipient.lastName', type='text', id='recipientLastName', placeholder='Last name', autocomplete='family-name', maxlength='20', aria-describedby='recipientLastNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.lastName.$error }')
                  b-form-invalid-feedback(id='recipientLastNameFeedback', v-if='paymentSubmitted && $v.recipient.lastName.$invalid') Please provide the recipient's last name
              .row
                b-form-group.col-xs-12.col-sm-7(label='Email', label-for='recipientEmail')
                  b-form-input(v-model='recipient.email', id='recipientEmail', type='email', maxlength='80', placeholder="Recipient's email address", autocomplete='email', aria-describedby='recipientEmailFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.email.$error }')
                  b-form-invalid-feedback(id='recipientEmailFeedback', v-if='paymentSubmitted && $v.recipient.email.$invalid') Please supply a valid email address for the recipient.
                b-form-group.col-xs-12.col-sm-5(label='Phone', label-for='recipientPhone')
                  b-form-input(v-model='recipient.phone', id='recipientPhone', type='tel', maxlength='14', placeholder="Recipient's phone", autocomplete='tel-national', aria-describedby='recipientPhoneFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.phone.$error }')
                  b-form-invalid-feedback(id='recipientPhoneFeedback', v-if='paymentSubmitted && $v.recipient.phone.$invalid') Please supply a valid phone number for the recipient.
              .row
                b-form-group.col-12(label='Street address', label-for='recipientAddress')
                  b-form-input(v-model='recipient.address', id='recipientAddress', type='text', maxlength='255', placeholder='Recipient\'s street address', autocomplete='street-address', aria-describedby='recipientAddressFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.address.$error }')
                  b-form-invalid-feedback(id='recipientAddressFeedback', v-if='paymentSubmitted && $v.recipient.address.$invalid') Please provide the student&apos;s street address.
              .row
                b-form-group.col-xs-12.col-sm-7(label='City', label-for='recipientCity')
                  b-form-input(v-model='recipient.city', id='recipientCity', type='text', maxlength='20', placeholder='City', autocomplete='address-level2', aria-describedby='recipientCityFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.city.$error }')
                  b-form-invalid-feedback(id='recipientCityFeedback', v-if='paymentSubmitted && $v.recipient.city.$invalid') Please provide the student&apos;s city.
                b-form-group.col-xs-12.col-sm-5(label='State', label-for='recipientState')
                  b-form-input(v-model='recipient.state', id='recipientState', type='text', maxlength='2', placeholder='State', autocomplete='address-level1', aria-describedby='recipientStateFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.state.$error }')
                  b-form-invalid-feedback(id='recipientStateFeedback', v-if='paymentSubmitted && $v.recipient.state.$invalid') Please provide the student&apos;s state.
              .row
                b-form-group.col-xs-12.col-sm-5(label='ZIP code', label-for='recipientZipCode')
                  b-form-input(v-model='recipient.zipCode', id='recipientZipCode', type='text', maxlength='10', placeholder='ZIP code', autocomplete='postal-code', aria-describedby='recipientZipCodeFeedback', :class='{ "is-invalid": paymentSubmitted && $v.recipient.zipCode.$error }')
                  b-form-invalid-feedback(id='recipientZipCodeFeedback', v-if='paymentSubmitted && $v.recipient.state.$invalid') Please provide the student&apos;s ZIP code.
              b-form-group(label='Send gift card via')
                b-form-radio(v-model='sendVia', value='Email') Email
                b-form-radio(v-model='sendVia', value='Mail') Mail
            p.mt-2.mb-0 Class cards and workshop purchases are non-refundable. Class cards expire one year from their purchase date.
          .card-footer
            .row
              .col-sm-8.col-xs-7
                .has-error(v-if='count > 1') Warning: you are purchasing {{ count }} items. If you intended to purchase less, please adjust the quantity above.
                .has-error(v-if='count === 0') Warning: There are no items in your cart. Please add some items then place your order.
              .col-sm-4.col-xs-5.text-right
                b-button(variant='warning', type='submit', :disabled='count == 0') Place Order
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import { store, mutations } from '@/store';
import { Item } from '@/types';
import CartItem from '@/components/CartItem.vue';

@Component({
  components: {
    CartItem
  },
  validations: {
    purchaser: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      phone: { required }
    },
    recipient: {
      // required if gift
      // firstName: { required },
      // lastName: { required },
      // email: { required, email },
      // phone: { required }
    }
  }
})
export default class Cart extends Vue {
  private gift: boolean = false;

  private sendVia: string = 'Email';

  private purchaser: any = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: '',
    phone: ''
  };

  private recipient: any = {
    firstName: 'John',
    lastName: 'Doe',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'PA',
    zipCode: ''
  };

  private instructions: string = '';

  private paymentSubmitted = false;

  private get applePayEnabled(): boolean {
    return store.cart.applePayEnabled;
  }

  private checkout(): void {
    alert('Set focus to credit card field');
  }

  private get count(): number {
    return store.cart.count;
  }

  private focusOnRecipient(): void {
    alert('Focus on recipient');
  }

  private get items(): Item[] {
    return store.cart.items;
  }

  private keepShopping(): void {
    this.$router.go(-1);
  }

  private onSubmit(): void {
    alert('Submitted.');
  }

  private get total(): number {
    return store.cart.total;
  }
}
</script>

<style scoped lang="scss">
</style>