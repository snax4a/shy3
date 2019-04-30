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
          b-dropdown-form.login(@submit.prevent='login', novalidate='', autocomplete='on')
            b-form-group(label='Email', label-for='userEmail')
              b-form-input(v-model='user.email', id='userEmail', type='email', placeholder='email@example.com', autocomplete='email', maxlength='80', ref='email')
            b-form-group(label='Password', label-for='password')
              b-form-input(v-model='user.password', id='password', type='password', autocomplete='current-password', maxlength='20', placeholder='Password')
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
          b-dropdown-form.contact(@submit.prevent='contact', novalidate='', autocomplete='on')
            b-form-group(label='First name', label-for='firstName')
              b-form-input(v-model='contact.firstName', id='firstName', placeholder='First name', autocomplete='given-name', maxlength='20', ref='firstName', aria-describedby='first-name-error')
              b-form-text.has-error(v-if='!contact.firstName', id='first-name-error') Please provide your first name.
            b-form-group(label='Last name', label-for='lastName')
              b-form-input(v-model='contact.lastName', id='lastName', placeholder='Last name', autocomplete='family-name', maxlength='20')
            b-form-group(label='Email', label-for='contactEmail', :invalid-feedback='invalidContactEmail')
              b-form-input(v-model='contact.email', id='contactEmail', placeholder='email@example.com', autocomplete='email', maxlength='80')
            b-form-group(label='Phone', label-for='phone')
              b-form-input(v-model='contact.phone', id='phone', type='tel', placeholder='412-555-1212', autocomplete='tel-national', maxlength='14')
            b-form-group(label='Comment or question', label-for='question')
              b-form-textarea(v-model='contact.question', id='question', rows='3', placeholder='Comment or question')
            b-form-checkbox(v-model='contact.optOut') Do not subscribe to newsletter
            br
            .text-right
              b-button(variant='warning', type='submit') Submit
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
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
  @Prop({ default: 0 }) private count!: number;
  @Prop({ default: { firstName: 'Guest', lastName: 'User', email: '', password: '',
    loggedIn: false, role: 'student', optOut: false } }) private user!: any;

  private focusEmail(e: any) {
    const theField = this.$refs.email as HTMLElement;
    theField.focus();
  }

  private focusFirstName(e: any) {
    const theField = this.$refs.firstName as HTMLElement;
    theField.focus();
  }

  private invalidContactEmail(): string {
    // if (this.contact.email )
    console.log('Invalid.');
    return 'Please enter a valid email address';
  }

  private login(e: any) {
    alert(JSON.stringify(this.user));
  }

  private contact(e: any) {
    alert(JSON.stringify(this.contact));
  }

  // private validations() {
  //   return {
  //   };
  // }
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