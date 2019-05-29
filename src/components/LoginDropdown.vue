<template lang='pug'>
b-dropdown(text='Login', variant='outline-primary', right='', @shown='focusEmail')
  br
  .text-center
    GoogleLogin
  b-dropdown-header.text-center or
  b-dropdown-divider
  b-dropdown-form.login(@submit.prevent='loginSubmit', novalidate='', autocomplete='on')
    .form-group(label='Email', label-for='userEmail')
      input.form-control(v-model.trim='login.email', id='userEmail', type='email', placeholder='email@example.com', autocomplete='email', maxlength='80', ref='email', aria-describedby='userEmailFeedback', :class='{ "is-invalid": loginSubmitted && $v.login.email.$error }')
      .invalid-feedback#userEmailFeedback Please provide a valid email address.
    .form-group(label='Password', label-for='password')
      input.form-control(v-model='login.password', id='password', type='password', autocomplete='current-password', maxlength='20', ref='password', placeholder='Password', aria-describedby='userPasswordFeedback', :class='{ "is-invalid": loginSubmitted && $v.login.password.$error }')
      .invalid-feedback#userPasswordFeedback Please enter your password.
    .text-right
      button.btn.btn-warning.btn-lg(type='submit') Login
  b-dropdown-divider
  b-dropdown-item-button Forgot Password?
  b-dropdown-item(to='/signup') Sign up
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import GoogleLogin from '@/components/GoogleLogin.vue';
import { focusOnFirstError } from '@/utils';

@Component({
  components: {
    GoogleLogin
  },
  validations: {
    login: {
      email: { email, required },
      password: { required }
    }
  }
})

export default class LoginDropdown extends Vue {
  private login: any = {
    email: '',
    password: ''
  };

  private loginSubmitted: boolean = false;

  private focusEmail(e: any) {
    const theField = this.$refs.email as HTMLElement;
    theField.focus();
  }

  private loginSubmit(e: any) {
    this.loginSubmitted = true;
    this.$v.login.$touch();
    focusOnFirstError(this);
    if (this.$v.login.$invalid) {
      return;
    }
    alert(JSON.stringify(this.login));
  }
}
</script>

<style scoped lang="scss">
  .dropdown-menu .login {
    min-width: 18rem;
  }
</style>