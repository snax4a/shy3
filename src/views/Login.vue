<template lang='pug'>
.container.login
  h1 Login
  p Schoolhouse Yoga supports Google-integrated logins and our own accounts.
    br
    | Don't have an account? 
    a(href='/signup') Create one »
  hr
  .row.justify-content-center
    .col-sm-12.col-md-4.col-md-offset-2
      .card
        .card-header.text-white.bg-primary Login with Google
        .card-body
          GoogleLogin
    .col-sm-12.col-md-4
      .card
        .card-header.text-white.bg-primary Login with a SHY account
        .card-body
          form.form(name='form', @submit.prevent='loginSubmit', novalidate='', autocomplete='on')
            .form-group
              label(for='userName') Email
              input.form-control(id='userName', v-model.trim='login.email', type='email', ref='email', autocomplete='email', maxlength='80', placeholder='email@example.com', aria-describedby='userEmailFeedback', :class='{ "is-invalid": loginSubmitted && $v.login.email.$error }')
              .invalid-feedback#userEmailFeedback Please provide a valid email address.
            .form-group
              label(for='userPassword') Password
              input.form-control(id='userPassword', v-model='login.password', type='password', ref='password', autocomplete='current-password', maxlength='20', placeholder='Password', aria-describedby='userPasswordFeedback', :class='{ "is-invalid": loginSubmitted && $v.login.password.$error }')
              .invalid-feedback#userPasswordFeedback Please enter your password.
            button.btn.btn-lg.btn-warning(type='submit') Login 
          br
          a(@click='forgotPassword', href='#') Forgot password?
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
export default class Login extends Vue {
  private login: any = {
    email: '',
    password: ''
  };

  private loginSubmitted: boolean = false;

  private mounted(): void {
    this.focusEmail();
  }

  private focusEmail() {
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

  private forgotPassword() {
    alert('Forgot password');
  }
}
</script>
