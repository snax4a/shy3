<template lang='pug'>
b-nav-item-dropdown.text-right(text='Contact', variant='outline-primary', right='', @shown='focusFirstName')
  b-dropdown-item.text-center(href='tel:+1-412-401-4444')
    fa(icon='phone')
    | &nbsp;&nbsp;Call +1 (412) 401-4444
  b-dropdown-divider
  b-dropdown-form.contact(@submit.prevent='contactSubmit', novalidate, autocomplete='on')
    .form-group
      label(for='contactFirstName') First name
      input.form-control(type='text', v-model='contact.firstName', id='contactFirstName', placeholder='First name', autocomplete='given-name', maxlength='20', ref='firstName', aria-describedby='firstNameFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.firstName.$error }')
      .invalid-feedback#firstNameFeedback Please provide your first name.
    .form-group
      label(for='contactLastName') Last name
      input.form-control(v-model.trim='contact.lastName', id='contactLastName', placeholder='Last name', autocomplete='family-name', maxlength='20', ref='lastName', aria-describedby='lastNameFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.lastName.$error }')
      .invalid-feedback#lastNameFeedback Please provide your last name.
    .form-group
      label(for='contactEmail') Email
      input.form-control(type='email', v-model.trim='contact.email', id='contactEmail', placeholder='email@example.com', autocomplete='email', ref='email', maxlength='80', aria-describedby='emailFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.email.$error }')
      .invalid-feedback#emailFeedback Please provide a valid email address.
    .form-group
      label(for='contactPhone') Phone
      input.form-control(type='tel', v-model.trim='contact.phone', id='contactPhone', placeholder='412-555-1212', autocomplete='tel-national', maxlength='14')
    .form-group
      label(for='contactQuestion') Question or comment
      textarea.form-control(v-model='contact.question', id='contactQuestion', rows='3', ref='question', placeholder='Comment or question', aria-describedby='questionFeedback', :class='{ "is-invalid": contactSubmitted && $v.contact.question.$error }')
      .invalid-feedback#questionFeedback Please provide a comment or question.
    .form-group.form-check
      label
        input.form-check-input(type='checkbox', v-model='contact.optOut')
        | Do not subscribe to newsletter
    br
    .text-right
      button.btn.btn-warning.btn-lg(type='submit') Submit
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import { focusOnFirstError } from '@/utils';
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
    focusOnFirstError(this);
    if (this.$v.contact.$invalid) {
      return;
    }
    alert(JSON.stringify(this.contact));
  }
}
</script>

<style scoped lang="scss">
  .dropdown-menu  .contact {
    min-width: 20rem;
    padding: 0.25rem 1.5rem;
  }
</style>