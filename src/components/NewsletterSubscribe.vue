<template lang='pug'>
form(@submit.prevent='onSubmit', novalidate, autocomplete='on', v-if='show')
  .input-group
    input.form-control(id='subscriberEmail', v-model='subscriber.email', type='email', placeholder='Email address for newsletter', autocomplete='email', maxlength='80', ref='subscriber', aria-describedby='subscriberEmailFeedback', :class='{ "is-invalid": subscriptionSubmitted && $v.subscriber.email.$error }')
    .input-group-append
      button.btn.btn-warning(type='submit') Subscribe
  .invalid-feedback#subscriberEmailFeedback Please provide a valid email address.
  //- Known Bootstrap bug - can't put invalid feedback in input group or button is square
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';

@Component({
  validations: {
    subscriber: {
      email: { email, required }
    }
  }
})
export default class NewsLetterSubscribe extends Vue {
  @Prop({ default: true }) private show!: boolean;
  private subscriptionSubmitted: boolean = false;
  private subscriber: any = {
    email: ''
  };

  private mounted() {
    this.focusSubscriber();
  }

  private focusSubscriber() {
    const theField = this.$refs.subscriber as HTMLElement;
    theField.focus();
  }

  private onSubmit() {
    this.subscriptionSubmitted = true;
    this.$v.subscriber.$touch();
    if (this.$v.subscriber.$invalid) {
      return;
    }
    alert(JSON.stringify(this.subscriber));
  }
}
</script>
