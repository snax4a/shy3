<template lang='pug'>
b-form(@submit.prevent='onSubmit', novalidate, autocomplete='on', v-if='show')
  b-input-group
    b-form-input(id='subscriberEmail', v-model='subscriber.email', type='email', placeholder='Email address for newsletter', autocomplete='email', maxlength='80', ref='subscriber', aria-describedby='subscriberEmailFeedback', :class='{ "is-invalid": subscriptionSubmitted && $v.subscriber.email.$error }')
    b-input-group-append
      b-button(variant='warning', type='submit') Subscribe
    b-form-invalid-feedback(id='subscriberEmailFeedback', v-if='subscriptionSubmitted && $v.subscriber.email.$invalid') Please provide a valid email address.
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
