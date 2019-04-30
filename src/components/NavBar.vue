<template lang='pug'>
.container
  b-navbar(toggleable='md', type='light')
    b-navbar-brand(to='/')
      img.brand(src='/img/logo-512x512.png', srcset='/img/logo.svg', alt='Schoolhouse Yoga Pittsburgh seal')
    b-navbar-toggle(target='nav-collapse')
    b-collapse.text-right#nav-collapse(is-nav='')
      b-navbar-nav
        b-nav-item(to='/classes') Classes
        b-nav-item(to='/workshops')
          span.far.fa-envelope
          | Workshops
        b-nav-item.d-md-none(to='/teachertraining') 200-hour Teacher Training
        b-nav-item.d-md-none(to='/locations') Directions
        b-nav-item(to='/cart', v-if='count > 0')
          fa(icon='shopping-cart')
          | &nbsp;Cart 
          b-badge(variant='secondary') {{ count }}
        b-nav-item(to='/admin', v-if='user.loggedIn && user.role == "admin"') Admin
        b-nav-item(to='/shynet', v-if='user.loggedIn && user.role != "student"') SHYnet
      b-navbar-nav.ml-auto
        b-dropdown(text='Login', v-if='!user.loggedIn', variant='outline-primary', right='', @shown='focusEmail')
          .text-center
            GoogleLogin
          b-dropdown-header.text-center or
          b-dropdown-divider
          b-dropdown-form.login(@submit.prevent='loginSubmit', novalidate='', autocomplete='on')
            b-form-group(label='Email', label-for='userEmail')
              b-form-input(v-model.trim='user.email', id='userEmail', type='email', placeholder='email@example.com', autocomplete='email', maxlength='80', ref='email', aria-describedby='userEmailFeedback', :class='{ "is-invalid": loginSubmitted && $v.user.email.$error }')
              b-form-invalid-feedback(id='userEmailFeedback', v-if='loginSubmitted && $v.user.email.$invalid') Please provide a valid email address.
            b-form-group(label='Password', label-for='password')
              b-form-input(v-model='user.password', id='password', type='password', autocomplete='current-password', maxlength='20', placeholder='Password', aria-describedby='userPasswordFeedback', :class='{ "is-invalid": loginSubmitted && $v.user.password.$error }')
              b-form-invalid-feedback(id='userPasswordFeedback', v-if='loginSubmitted && $v.user.password.$invalid') Please enter your password.
            .text-right
              b-button(variant='warning', type='submit') Login
          b-dropdown-divider
          b-dropdown-item-button Forgot Password?
          b-dropdown-item(to='/signup') Sign up
        b-nav-item-dropdown(right='', v-if='user.loggedIn')
          template(slot='button-content')
            fa(icon='user')
            | &nbsp;{{ user.firstName }}
          b-dropdown-item.text-right(to='/profile') Profile
          b-dropdown-item.text-right(to='/logout') Logout
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
import { required, email, minLength } from 'vuelidate/lib/validators';
import GoogleLogin from '@/components/GoogleLogin.vue';

@Component({
  components: {
    GoogleLogin
  },
  validations: {
    user: {
      email: { required },
      password: { required }
    },
    contact: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      question: { required }
    }
  }
})

export default class NavBar extends Vue {
  @Prop({ default: 0 })
  private count!: number;
  @Prop({ default: { firstName: 'Guest', lastName: 'User', email: '', password: '',
    loggedIn: false, role: 'student', optOut: false } })
  private user!: any;
  private contact: any = { firstName: '', lastName: '', email: '', phone: '', question: '', optOut: false };
  private contactSubmitted: boolean = false;
  private loginSubmitted: boolean = false;

  private focusEmail(e: any) {
    const theField = this.$refs.email as HTMLElement;
    theField.focus();
  }

  private focusFirstName(e: any) {
    const theField = this.$refs.firstName as HTMLElement;
    theField.focus();
  }

  private loginSubmit(e: any) {
    console.log('Login');
    this.loginSubmitted = true;
    this.$v.user.$touch();
    if (this.$v.user.$invalid) {
      return;
    }
    alert(JSON.stringify(this.user));
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
.navbar {
	border-bottom: 0;
  margin-bottom: 0;
  padding: 0;
}

.navbar-brand {
  float: left;
  height: 50px;
}

.navbar .container {
	padding-top: env(safe-area-inset-top);
}

.badge {
	position: relative;
	top: -2px;
}

li>.router-link-exact-active {
  color: gray!important;
}

img.brand {
  height:170px;
  width: 170px;
  margin-top: 20px;
}

.dropdown-menu .login, .dropdown-menu .contact {
  min-width: 18rem;
}
</style>