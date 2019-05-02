<template lang='pug'>
b-dropdown(text='Login', variant='outline-primary', right='', @shown='focusEmail')
  .text-center
    GoogleLogin
  b-dropdown-header.text-center or
  b-dropdown-divider
  b-dropdown-form.login(@submit.prevent='loginSubmit', novalidate='', autocomplete='on')
    b-form-group(label='Email', label-for='userEmail')
      b-form-input(v-model.trim='login.email', id='userEmail', type='email', placeholder='email@example.com', autocomplete='email', maxlength='80', ref='email', aria-describedby='userEmailFeedback', :class='{ "is-invalid": loginSubmitted && $v.login.email.$error }')
      b-form-invalid-feedback(id='userEmailFeedback', v-if='loginSubmitted && $v.login.email.$invalid') Please provide a valid email address.
    b-form-group(label='Password', label-for='password')
      b-form-input(v-model='login.password', id='password', type='password', autocomplete='current-password', maxlength='20', placeholder='Password', aria-describedby='userPasswordFeedback', :class='{ "is-invalid": loginSubmitted && $v.login.password.$error }')
      b-form-invalid-feedback(id='userPasswordFeedback', v-if='loginSubmitted && $v.login.password.$invalid') Please enter your password.
    .text-right
      b-button(variant='warning', type='submit') Login
  b-dropdown-divider
  b-dropdown-item-button Forgot Password?
  b-dropdown-item(to='/signup') Sign up
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { required, email } from 'vuelidate/lib/validators';
import GoogleLogin from '@/components/GoogleLogin.vue';

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

export default class Login extends Vue {
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