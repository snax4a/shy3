<template lang='pug'>
.container.profile
  .row
    .col-sm-12.col-md-6.col-md-offset-3
      h1 User Profile Settings
      form.form(@submit.prevent='submit', novalidate='', autocomplete='on')
        .form-group(v-if='user.provider==="local"')
          label(for='password') Current Password (required)
          input.form-control(type='password', id='password', v-model='user.password', placeholder='Current password', autofocus='', autocomplete='current-password', aria-describedby='passwordFeedback', :class='{ "is-invalid": formSubmitted && $v.user.password.$error }')
          .invalid-feedback#passwordFeedback Your password is required to update your profile.
        .form-group(v-if='user.provider==="local"')
          label(for='passwordNew') New Password (only if you want to change it)
          input.form-control(type='password', id='passwordNew', v-model='user.passwordNew', placeholder='New password', autocomplete='new-password', aria-describedby='passwordNewFeedback', :class='{ "is-invalid": formSubmitted && $v.user.passwordNew.$error }')
          .invalid-feedback#passwordNewFeedback Password must be at least six characters.
        .form-group(ng-if='user.provider==="local"')
          label(for='passwordConfirm') Confirm New Password
          input.form-control(type='password', id='passwordConfirm', v-model='user.passwordConfirm', compare-to="user.passwordNew", placeholder='Confirm password', autocomplete='new-password', aria-describedby='passwordConfirmFeedback', :class='{ "is-invalid": formSubmitted && $v.user.passwordConfirm.$error }')
          .invalid-feedback#passwordConfirmFeedback Please confirm the password you entered.
        .form-group
          label(for='firstName') First name
          input.form-control(type='text', id='firstName', v-model='user.firstName', autofocus='', placeholder='First name', autocomplete='given-name', aria-describedby='firstNameFeedback', :class='{ "is-invalid": formSubmitted && $v.user.firstName.$error }')
          .invalid-feedback#firstNameFeedback Please enter your first name.
        .form-group
          label(for='lastName') Last name
          input.form-control(type='text', id='lastName', v-model='user.lastName', placeholder='Last name', autocomplete='family-name', aria-describedby='lastNameFeedback', :class='{ "is-invalid": formSubmitted && $v.user.lastName.$error }')
          .invalid-feedback#lastNameFeedback Please enter your last name.
        .form-group
          label(for='phone') Phone
          input.form-control(type='tel', id='phone', v-model='user.phone', placeholder='Phone', autocomplete='tel-national', aria-describedby='phoneFeedback', :class='{ "is-invalid": formSubmitted && $v.user.phone.$error }')
          .invalid-feedback#phoneFeedback Please enter a valid phone number.
        .form-group(v-if='user.provider==="local"')
          label(for='email') Email
          input.form-control(type='email', id='email', v-model='user.email', placeholder='Email', autocomplete='email', aria-describedby='emailFeedback', :class='{ "is-invalid": formSubmitted && $v.user.email.$error }')
          .invalid-feedback#emailFeedback Please provide a valid email address.
        label
          input(type='checkbox', id='optOut', v-model='user.optOut')
          |  Do not subscribe to newsletter
        br
        br
        button.btn.btn-lg.btn-warning(type='submit') Update
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { required, email, sameAs } from 'vuelidate/lib/validators';

@Component({
  validations: {
    user: {
      password: { required },
      passwordConfirm: {
        sameAsPassword: sameAs('password')
      },
      firstName: { required },
      lastName: { required },
      phone: { required },
      email: { required, email }
    }
  }
})
export default class Profile extends Vue {
  submit(): void {
    alert('submitted');
  }
}
</script>
