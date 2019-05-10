<template lang='pug'>
.container.cart
  h1 Shopping Cart
  .row
    .col-md-6
      b-form(@submit.prevent='onSubmit', novalidate='')
        .card
          .card-header {{ count > 0 ? count : 'No' }} items in your cart
          .card-body
            table.table.table-striped.table-hover.table-borderless
              thead
                tr
                  th What
                  th Each
                  th.text-center Qty
                  th Amount
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


    //- .col-md-6
      form(name='checkout', ng-submit='$ctrl.placeOrder(checkout)', novalidate='', autocomplete='on')
        .panel.panel-default(aria-labelledby='paymentPanelTitle')
          .panel-heading
            #paymentPanelTitle.panel-title Payment Info
          .panel-body
            .row(ng-if='$ctrl.Cart.applePayEnabled')
              .col-xs-12
                a.apple-pay-button(ng-click='$ctrl.applePayCheckout()')
                br
                | Or fill out the form below to use a credit card.
                br
                br
            .row
              .form-group.col-xs-12.col-sm-7.col-lg-6
                label(id='labelCardNumber', for='card-number') Credit card number
                .input-group(style='margin-bottom: 0px!important')
                  .form-control(id='card-number')
                  span.input-group-addon
                    span.far.fa-credit-card
                ng-messages.help-block.has-error(for='$ctrl.Cart.hostedFieldsState.number', ng-show='(!$ctrl.Cart.hostedFieldsState.number.isEmpty && $ctrl.Cart.hostedFieldsState.number.isInvalid) || checkout.$submitted', role='alert')
                  ng-message(when='isEmpty') Please provide a card number.
                  ng-message(when='isInvalid') {{ $ctrl.braintreeError || 'Please provide a valid card number.' }} 
              .form-group.col-xs-7.col-sm-5.col-lg-4
                label(for='expiration-date') Expires
                .input-group(style='margin-bottom: 0px!important')
                  .form-control(id='expiration-date')
                  span.input-group-addon
                    span.far.fa-calendar-alt
                ng-messages.help-block.has-error(for='$ctrl.Cart.hostedFieldsState.expirationDate', ng-show='(!$ctrl.Cart.hostedFieldsState.expirationDate.isEmpty && $ctrl.Cart.hostedFieldsState.expirationDate.isInvalid) || checkout.$submitted', role='alert')
                  ng-message(when='isEmpty') Please provide an expiration date.
                  ng-message(when='isInvalid') Please provide a valid expiration date.
              .form-group.col-xs-5.col-md-4
                label(for='cvv') CVV
                .input-group(style='margin-bottom: 0px!important')
                  .form-control(id='cvv')
                  span.input-group-addon
                    span.fas.fa-lock
                ng-messages.help-block.has-error(for='$ctrl.Cart.hostedFieldsState.cvv', ng-show='(!$ctrl.Cart.hostedFieldsState.cvv.isEmpty && $ctrl.Cart.hostedFieldsState.cvv.isInvalid) || checkout.$submitted', role='alert')
                  ng-message(when='isEmpty') Please provide the card security code.            
                  ng-message(when='isInvalid') Please provide a valid card security code.
            .row
              .form-group.col-xs-12.col-sm-6
                label(for='firstName')
                  span(ng-if='$ctrl.Cart.gift') Purchaser&apos;s first name
                  span(ng-if='!$ctrl.Cart.gift') Student&apos;s first name
                input.form-control(id='firstName', name='firstName', ng-model='$ctrl.purchaser.firstName', required='', autocomplete='cc-given-name', type='text', maxlength='20', placeholder='First name')
                ng-messages.help-block.has-error(for='checkout.firstName.$error', ng-show='checkout.firstName.$dirty || checkout.$submitted', role='alert')
                  ng-message(when='required') Please provide the student&apos;s first name.
              .form-group.col-xs-12.col-sm-6
                label(for='lastName') Last name
                input.form-control(id='lastName', name='lastName', ng-model='$ctrl.purchaser.lastName', required='', autocomplete='cc-family-name', type='text', maxlength='20', placeholder='Last name')
                ng-messages.help-block.has-error(for='checkout.lastName.$error', ng-show='checkout.lastName.$dirty || checkout.$submitted', role='alert')
                  ng-message(when='required') Please provide the student&apos;s last name.
            .row
              .form-group.col-xs-12.col-sm-7
                label(for='email') Email
                input.form-control(id='email', name='email', ng-model='$ctrl.purchaser.email', required='', autocomplete='email', type='email', maxlength='80', placeholder='Email address')
                ng-messages.help-block.has-error(for='checkout.email.$error', ng-show='checkout.email.$dirty || checkout.$submitted', role='alert')
                  ng-message(when='required') Please provide an email address (used to credit student&apos;s account).
                  ng-message(when='email') Please supply a valid email address for the student (used to credit student&apos;s account).
              .form-group.col-xs-12.col-sm-5
                label(for='phone') Phone
                input.form-control(id='phone', name='phone', ng-model='$ctrl.purchaser.phone', required='', autocomplete='tel-national', type='tel', maxlength='23', placeholder='Phone')
                ng-messages.help-block.has-error(for='checkout.phone.$error', ng-show='checkout.phone.$dirty || checkout.$submitted', role='alert')
                  ng-message(when='required') Please provide the student&apos;s phone number.
            .form-group
              label(for='instructions') Instructions
              textarea.form-control(id='instructions', name='instructions', ng-model='$ctrl.Cart.instructions', rows='2', cols='20', placeholder='Instructions for this purchase')
            .checkbox
              label
                input(name='gift',type='checkbox', ng-model='$ctrl.Cart.gift', value='true', ng-click='$ctrl.focusOnRecipient()') 
                | This is a gift

            fieldset(ng-hide='!$ctrl.Cart.gift')
              .row
                .form-group.col-xs-12.col-sm-6
                  label(for='recipientFirstName') Student&apos;s first name
                  input.form-control(id='recipientFirstName', name='recipientFirstName', ng-model='$ctrl.recipient.firstName', ng-required='$ctrl.Cart.gift', type='text', maxlength='14', placeholder="Recipient's first name", autocomplete='given-name')
                  ng-messages.help-block.has-error(for='checkout.recipientFirstName.$error', ng-show='checkout.recipientFirstName.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s first name.
                .form-group.col-xs-12.col-sm-6
                  label(for='recipientLastName') Last name
                  input.form-control(id='recipientLastName', name='recipientLastName', ng-model='$ctrl.recipient.lastName', ng-required='$ctrl.Cart.gift', type='text', maxlength='20', placeholder="Recipient's last name", autocomplete='family-name')
                  ng-messages.help-block.has-error(for='checkout.recipientLastName.$error', ng-show='checkout.recipientLastName.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s last name.
              .row
                .form-group.col-xs-12.col-sm-7
                  label(for='recipientEmail') Email
                  input.form-control(id='recipientEmail', name='recipientEmail', ng-model='$ctrl.recipient.email', ng-required='$ctrl.Cart.gift && $ctrl.Cart.sendVia == "Email"', type='email', maxlength='80', placeholder="Recipient's email address", autocomplete='email')
                  ng-messages.help-block.has-error(for='checkout.recipientEmail.$error', ng-show='checkout.recipientEmail.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s email address.
                    ng-message(when='email') Please supply a valid email address for the recipient.
                .form-group.col-xs-12.col-sm-5
                  label(for='recipientPhone') Phone
                  input.form-control(id='recipientPhone', name='recipientPhone', ng-model='$ctrl.recipient.phone', ng-required='$ctrl.Cart.gift', type='tel', maxlength='14', placeholder="Recipient's phone", autocomplete='tel-national')
                  ng-messages.help-block.has-error(for='checkout.recipientPhone.$error', ng-show='checkout.recipientPhone.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s phone number.
              .form-group
                  label(for='recipientAddress') Address
                  input.form-control(id='recipientAddress', name='recipientAddress', ng-model='$ctrl.recipient.address', ng-required='$ctrl.Cart.gift && $ctrl.Cart.sendVia == "Mail"', type='text', maxlength='255', placeholder="Recipient's address", autocomplete='street-address')
                  ng-messages.help-block.has-error(for='checkout.recipientAddress.$error', ng-show='checkout.recipientAddress.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s street address.
              .row
                .form-group.col-xs-12.col-sm-7
                  label(for='recipientCity') City
                  input.form-control(id='recipientCity', name='recipientCity', ng-model='$ctrl.recipient.city', ng-required='$ctrl.Cart.gift && $ctrl.Cart.sendVia == "Mail"', autocomplete='address-level2', type='text', maxlength='20', placeholder="Recipient's city")
                  ng-messages.help-block.has-error(for='checkout.recipientCity.$error', ng-show='checkout.recipientCity.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s city.
                .form-group.col-xs-12.col-sm-5
                  label(for='recipientState') State
                  input.form-control(id='recipientState', name='recipientState', type='text', ng-model='$ctrl.recipient.state', ng-change='$ctrl.recipient.state = $ctrl.recipient.state.toUpperCase()', maxlength='2', ng-required='$ctrl.Cart.gift && $ctrl.Cart.sendVia == "Mail"', autocomplete='address-level1')
                  ng-messages.help-block.has-error(for='checkout.recipientState.$error', ng-show='checkout.recipientState.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s state.
              .row
                .form-group.col-xs-12.col-sm-5
                  label(for='recipientZipCode') ZIP code
                  input.form-control(id='recipientZipCode', name='recipientZipCode', ng-model='$ctrl.recipient.zipCode', ng-required='$ctrl.Cart.gift && $ctrl.Cart.sendVia == "Mail"', autocomplete='postal-code', type='text', maxlength='10', placeholder="Recipient's ZIP code")
                  ng-messages.help-block.has-error(for='checkout.recipientZipCode.$error', ng-show='checkout.recipientZipCode.$dirty || checkout.$submitted', role='alert')
                    ng-message(when='required') Please provide the student&apos;s ZIP code.
              | Send gift card via &nbsp;&nbsp;
              label.radio-inline
                input(type='radio', name='sendVia', ng-model='$ctrl.Cart.sendVia', value='Email') 
                | Email 
              label.radio-inline
                input(type='radio', name='sendVia', ng-model='$ctrl.Cart.sendVia', value='Mail') 
                | Mail
              br
              br
            p Class cards and workshop purchases are non-refundable. Class cards expire one year from their purchase date.
          .panel-footer.clearfix
            p.col-xs-9.has-error(ng-if='$ctrl.Cart.getTotalItems() > 1') Warning: you are purchasing {{ $ctrl.Cart.getTotalItems() }} items. If you intended to purchase less, please adjust the quantity above.
            p.col-xs-9.has-error(ng-if='$ctrl.Cart.getTotalItems() == 0') Warning: There are no items in your cart. Please add some items then place your order.
            input.btn.btn-warning.pull-right(type='submit', name='placeOrder', value='Place Order', ng-disabled='$ctrl.buttonDisabled || !$ctrl.Cart.clientInstance || $ctrl.Cart.hostedFieldsState.isInvalid || !checkout.$valid || $ctrl.Cart.isEmpty()')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { store, mutations } from '@/store';
import { Item } from '@/types';
import CartItem from '@/components/CartItem.vue';

@Component({
  components: {
    CartItem
  }
})
export default class Cart extends Vue {
  private async mounted(): Promise<void> {
    return await mutations.productsSet();
  }

  private checkout(): void {
    alert('Set focus to credit card field');
  }

  private get count(): number {
    return store.cart.count;
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