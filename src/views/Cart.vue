<template lang='pug'>
.container.cart
  h1 Shopping Cart
  .row
    .col-md-6
      form(novalidate='')
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
            button.btn.btn-primary(type='button', @click='$router.go(-1)') Keep Shopping
            a.btn.btn-warning(href='#', @click='$refs.cc.click()', :disabled='count == 0') Checkout »
    .col-md-6
      form(@submit.prevent='onSubmit', novalidate='', autocomplete='on')
        .card
          .card-header Payment Info
          .card-body
            .row(v-if='applePayEnabled')
              .col-12.pb-2
                a.apple-pay-button(@click='applePayCheckout()')
                br
                | Or fill out the form below to use a credit card.
            .row
              .form-group.col-xs-12.col-sm-7.col-lg-6
                label(for='cc', ref='cc') Credit card number
                .input-group.mb-0
                  .form-control(id='cc')
                  .input-group-append
                    .span.input-group-text
                      fa(:icon='["far", "credit-card"]')
                small(v-if='paymentSubmitted && hostedFieldsState.number && hostedFieldsState.number.isInvalid').has-error Please provide a valid card number.
              .form-group.col-xs-7.col-sm-5.col-lg-4
                label(for='expiration', ref='expiration') Expires
                .input-group.mb-0
                  .form-control(id='expiration')
                  .input-group-append
                    .span.input-group-text
                      fa(icon='calendar-alt')
                small(v-if='paymentSubmitted && hostedFieldsState.expirationDate && hostedFieldsState.expirationDate.isInvalid').has-error.has-error Fix expiration date.
              .form-group.col-xs-5.col-md-4
                label(for='cvv', ref='cvv') CVV
                .input-group.mb-0
                  .form-control(id='cvv')
                  .input-group-append
                    .span.input-group-text
                      fa(icon='lock')
                small(v-if='paymentSubmitted && hostedFieldsState.cvv && hostedFieldsState.cvv.isInvalid').has-error.has-error Please provide a valid card security code.
            .row
              .form-group.col-xs-12.col-sm-6
                label(for='purchaserFirstName') {{ order.gift ? "Purchaser" : "Student" }} first name
                input.form-control(v-model='order.purchaser.firstName', type='text', id='purchaserFirstName', ref='purchaserFirstName', placeholder='First name', autocomplete='cc-given-name', maxlength='20', aria-describedby='purchaserFirstNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.purchaser.firstName.$error }')
                .invalid-feedback#purchaserFirstNameFeedback This is a required field.
              .form-group.col-xs-12.col-sm-6
                label(for='purchaserLastName') Last name
                input.form-control(v-model='order.purchaser.lastName', type='text', id='purchaserLastName', ref='purchaserLastName', placeholder='Last name', autocomplete='cc-family-name', maxlength='20', aria-describedby='purchaserLastNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.purchaser.lastName.$error }')
                .invalid-feedback#purchaserLastNameFeedback This is a required field.
            .row
              .form-group.col-xs-12.col-sm-7
                label(for='purchaserEmail') Email
                input.form-control(v-model='order.purchaser.email', type='email', id='purchaserEmail', ref='purchaserEmail', placeholder='Email address', autocomplete='email', maxlength='80', aria-describedby='purchaserEmailFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.purchaser.email.$error }')
                .invalid-feedback#purchaserEmailFeedback Please provide a valid email address.
              .form-group.col-xs-12.col-sm-5
                label(for='purchaserPhone') Phone
                input.form-control(v-model='order.purchaser.phone', type='tel', id='purchaserPhone', ref='purchaserPhone', placeholder='Phone', autocomplete='tel-national', maxlength='23', aria-describedby='purchaserPhoneFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.purchaser.phone.$error }')
                .invalid-feedback#purchaserPhoneFeedback Please provide a phone number.
            .form-group
              label(for='instructions') Instructions
              textarea.form-control(v-model='order.instructions', id='instructions', rows='2', cols='20', placeholder='Instructions for this purchase')
            .form-group.form-check
              label
                input.form-check-input(type='checkbox', v-model='order.gift')
                | This is a gift
            fieldset(v-if='order.gift')
              .row.mt-2
                .form-group.col-xs-12.col-sm-6
                  label(for='recipientFirstName') Student's first name
                  input.form-control(v-model='order.recipient.firstName', v-focus, type='text', id='recipientFirstName', ref='recipientFirstName', placeholder='First name', autocomplete='given-name', maxlength='20', aria-describedby='recipientFirstNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.firstName.$error }')
                  .invalid-feedback#recipientFirstNameFeedback Please provide the recipient&apos;s first name
                .form-group.col-xs-12.col-sm-6
                  label(for='recipientLastName') Last name
                  input.form-control(v-model='order.recipient.lastName', type='text', id='recipientLastName', ref='recipientLastName', placeholder='Last name', autocomplete='family-name', maxlength='20', aria-describedby='recipientLastNameFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.lastName.$error }')
                  .invalid-feedback#recipientLastNameFeedback Please provide the recipient&apos;s last name
              .row
                .form-group.col-xs-12.col-sm-7
                  label(for='recipientEmail') Email
                  input.form-control(v-model='order.recipient.email', id='recipientEmail', ref='recipientEmail', type='email', maxlength='80', placeholder="Recipient's email address", autocomplete='email', aria-describedby='recipientEmailFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.email.$error }')
                  .invalid-feedback#recipientEmailFeedback Please supply a valid email address for the recipient.
                .form-group.col-xs-12.col-sm-5
                  label(for='recipientPhone') Phone
                  input.form-control(v-model='order.recipient.phone', id='recipientPhone', ref='recipientPhone', type='tel', maxlength='14', placeholder="Recipient's phone", autocomplete='tel-national', aria-describedby='recipientPhoneFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.phone.$error }')
                  .invalid-feedback#recipientPhoneFeedback Please supply a valid phone number for the recipient.
              .row
                .form-group.col-12
                  label(for='recipientAddress') Street address
                  input.form-control(v-model='order.recipient.address', id='recipientAddress', ref='recipientAddress', type='text', maxlength='255', placeholder='Recipient\'s street address', autocomplete='street-address', aria-describedby='recipientAddressFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.address.$error }')
                  .invalid-feedback#recipientAddressFeedback Please provide the student&apos;s street address.
              .row
                .form-group.col-xs-12.col-sm-7
                  label(for='recipientCity') City
                  input.form-control(v-model='order.recipient.city', id='recipientCity', ref='recipientCity', type='text', maxlength='20', placeholder='City', autocomplete='address-level2', aria-describedby='recipientCityFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.city.$error }')
                  .invalid-feedback#recipientCityFeedback Please provide the student&apos;s city.
                .form-group.col-xs-12.col-sm-5
                  label(for='recipientState') State
                  input.form-control(v-model='order.recipient.state', id='recipientState', ref='recipientState', type='text', maxlength='2', placeholder='State', autocomplete='address-level1', aria-describedby='recipientStateFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.state.$error }')
                  .invalid-feedback(id='recipientStateFeedback', v-if='paymentSubmitted && $v.order.recipient.state.$invalid') Please provide the student&apos;s state.
              .row
                .form-group.col-xs-12.col-sm-5
                  label(for='recipientZipCode') ZIP code
                  input.form-control(v-model='order.recipient.zipCode', id='recipientZipCode', ref='recipientZipCode', type='text', maxlength='10', placeholder='ZIP code', autocomplete='postal-code', aria-describedby='recipientZipCodeFeedback', :class='{ "is-invalid": paymentSubmitted && $v.order.recipient.zipCode.$error }')
                  .invalid-feedback(id='recipientZipCodeFeedback', v-if='paymentSubmitted && $v.order.recipient.zipCode.$invalid') Please provide the student&apos;s ZIP code.
              p.mb-0 Send gift card via
                .form-check.form-check-inline
                  label
                    input.form-check-input(type='radio', v-model='order.sendVia', value='Email')
                    | Email
                .form-check.form-check-inline
                  label
                    input.form-check-input(type='radio', v-model='order.sendVia', value='Mail')
                    | Mail
            p.mt-2.mb-0 Class cards and workshop purchases are non-refundable. Class cards expire one year from their purchase date.
          .card-footer
            .row
              .col-sm-8.col-xs-7
                .has-error(v-if='count > 1') Warning: you are purchasing {{ count }} items. If you intended to purchase less, please adjust the quantity above.
                .has-error(v-if='count === 0') Warning: There are no items in your cart. Please add some items then place your order.
              .col-sm-4.col-xs-5.text-right
                button.btn.btn-warning(type='submit', :disabled='count == 0') Place Order
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import { store, mutations } from '@/store';
import { Item, Order, SendVia } from '@/types';
import { focusOnFirstError } from '@/utils';
import CartItem from '@/components/CartItem.vue';
import braintree from '@/services/Braintree';

const validations: any = function(this: any) {
  return this.order.gift ?
    {
      order: {
        purchaser: {
          firstName: { required },
          lastName: { required },
          email: { required, email },
          phone: { required }
        },
        recipient: {
          firstName: { required },
          lastName: { required },
          email: { required, email },
          phone: { required },
          address: { required },
          city: { required },
          state: { required },
          zipCode: { required }
        }
      }
    } :
    {
      order: {
        purchaser: {
          firstName: { required },
          lastName: { required },
          email: { required, email },
          phone: { required }
        }
      }
    };
};

@Component({
  components: {
    CartItem
  },
  validations
})
export default class Cart extends Vue {
  private order: Order = {
    gift: false,
    sendVia: SendVia.Email,
    instructions: '',
    purchaser: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: '',
      phone: ''
    },
    recipient: {
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'PA',
      zipCode: ''
    }
  };

  private paymentSubmitted = false;

  private hostedFieldsInstance: any = {};
  private hostedFieldsState: any = {
    isInvalid: true // because nothing was entered yet
  };

  private async created(): Promise<void> {
    const client = await store.client;
    this.hostedFieldsInstance = await braintree.hostedFields.create({
      client,
      fields: {
        number: {
          selector: '#cc',
          placeholder: '4111 1111 1111 1111'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '123'
        },
        expirationDate: {
          selector: '#expiration',
          placeholder: '10/2020'
        }
      },
      styles: {
        input: {
          'font-size': '14px',
          'font-family': 'Helvetica Neue, Helvetica, Arial, sans-serif',
          color: '#555'
        },
        ':focus': {
          'border-color': '#66afe9'
        },
        'input.invalid': {
          color: '#dc3545'
        },
        'input.valid': {
          color: 'green'
        }
      }
    });
    this.braintreeHostedFieldsEventHandlers(['blur', 'focus', 'validityChange', 'notEmpty', 'empty']);
  }

  private async braintreeUpdateHostedFieldsState() {
    const thisInstance = await this.hostedFieldsInstance;
    this.hostedFieldsState = thisInstance.getState().fields;
    this.hostedFieldsState.cvv.isInvalid = !this.hostedFieldsState.cvv.isValid;
    this.hostedFieldsState.expirationDate.isInvalid = !this.hostedFieldsState.expirationDate.isValid;
    this.hostedFieldsState.number.isInvalid = !this.hostedFieldsState.number.isValid;
    this.hostedFieldsState.isInvalid = this.hostedFieldsState.cvv.isInvalid ||
      this.hostedFieldsState.number.isInvalid || this.hostedFieldsState.number.isInvalid;
  }

  private async braintreeHostedFieldsEventHandlers(eventNameArray: string[]) {
    for (const eventName of eventNameArray) {
      const thisInstance = await this.hostedFieldsInstance;
      thisInstance.on(eventName, (event: any) => {
        this.$nextTick(() => {
          if (eventName === 'validityChange') {
            this.braintreeUpdateHostedFieldsState();
            return event;
          }
        });
      });
    }
  }

  private applePayCheckout(): void {
    alert('Apple Pay checkout process');
  }

  private get applePayEnabled(): boolean {
    return store.cart.applePayEnabled;
  }

  private get count(): number {
    return store.cart.count;
  }

  private get items(): Item[] {
    return store.cart.items;
  }

  private onSubmit(): void {
    this.paymentSubmitted = true;
    this.$v.order.$touch();
    focusOnFirstError(this);

    if (this.$v.order.$invalid || this.hostedFieldsState.isInvalid) {
      return;
    }
    alert(JSON.stringify(this.order));
  }

  private get total(): number {
    return store.cart.total;
  }
}
</script>

<style scoped lang="scss">
</style>