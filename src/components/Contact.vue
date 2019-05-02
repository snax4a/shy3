<template lang='pug'>
b-nav-item-dropdown.text-right(text='Contact', variant='outline-primary', right='', @shown='focusFirstName')
  b-dropdown-item.text-center(href='tel:+1-412-401-4444')
    fa(icon='phone')
    | &nbsp;&nbsp;Call +1 (412) 401-4444
  b-dropdown-divider
  b-dropdown-form.contact(@submit.prevent='contactSubmit', novalidate, autocomplete='on')
    b-form-group(label='First name', label-for='contactFirstName')
      b-form-input(v-model='contact.firstName', id='contactFirstName', placeholder='First name', autocomplete='given-name', maxlength='20', ref='firstName', aria-describedby='firstNameFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.firstName.$error }')
      b-form-invalid-feedback(id='firstNameFeedback', v-if='contactSubmitted && $v.contact.firstName.$invalid') Please provide your first name.
    b-form-group(label='Last name', label-for='contactLastName')
      b-form-input(v-model.trim='contact.lastName', id='contactLastName', placeholder='Last name', autocomplete='family-name', maxlength='20', aria-describedby='lastNameFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.lastName.$error }')
      b-form-invalid-feedback(id='lastNameFeedback', v-if='contactSubmitted && $v.contact.lastName.$invalid') Please provide your last name.
    b-form-group(label='Email', label-for='contactEmail')
      b-form-input(v-model.trim='contact.email', id='contactEmail', placeholder='email@example.com', autocomplete='email', maxlength='80', aria-describedby='emailFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.email.$error }')
      b-form-invalid-feedback(id='emailFeedback', v-if='contactSubmitted && $v.contact.email.$invalid') Please provide a valid email address.
    b-form-group(label='Phone', label-for='contactPhone')
      b-form-input(v-model.trim='contact.phone', id='contactPhone', type='tel', placeholder='412-555-1212', autocomplete='tel-national', maxlength='14')
    b-form-group(label='Comment or question', label-for='contactQuestion')
      b-form-textarea(v-model='contact.question', id='contactQuestion', rows='3', placeholder='Comment or question', aria-describedby='questionFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.question.$error }')
      b-form-invalid-feedback(id='questionFeedback', v-if='contactSubmitted && $v.contact.question.$invalid') Please provide a comment or question.
    b-form-checkbox(v-model='contact.optOut') Do not subscribe to newsletter
    br
    .text-right
      b-button(variant='warning', type='submit') Submit
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import GoogleLogin from '@/components/GoogleLogin.vue';

@Component({
  validations: {
    contact: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      question: { required }
    }
  }
})

export default class Contact extends Vue {
  private contact: any = { firstName: '', lastName: '', email: '', phone: '', question: '', optOut: false };
  private contactSubmitted: boolean = false;
  private loginSubmitted: boolean = false;

  private focusFirstName(e: any) {
    const theField = this.$refs.firstName as HTMLElement;
    theField.focus();
  }

  private contactSubmit(e: any) {
    this.contactSubmitted = true;
    this.$v.contact.$touch();
    if (this.$v.contact.$invalid) {
      return;
    }
    alert(JSON.stringify(this.contact));
  }
}
</script>

<style scoped lang="scss">
  .dropdown-menu  .contact {
    min-width: 18rem;
  }
</style>