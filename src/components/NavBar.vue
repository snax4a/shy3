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
      // Right aligned nav items
      b-navbar-nav.ml-auto

        b-dropdown(text='Login',  v-if='!user.loggedIn', variant='outline-primary' right='')
          b-dropdown-form
            GoogleLogin
            // b-dropdown-divider
            b-dropdown-header or
            // b-dropdown-divider
            b-form-group(label='Email', label-for='email')
              b-form-input(id='email', placeholder='email@example.com', autofocus='')
            b-form-group(label='Password', label-for='password')
              b-form-input(id='password', type='password')
            b-button(variant='warning', @click='login') Login
            b-dropdown-divider
            b-dropdown-item-button Forgot Password?
            b-dropdown-item(to='/signup') Sign up

        b-nav-item-dropdown(right='', v-if='user.loggedIn')
          template(slot='button-content')
            fa(icon='user')
            | &nbsp;{{ user.firstName }}
          b-dropdown-item.text-right(to='/profile') Profile
          b-dropdown-item.text-right(to='/logout') Logout
        b-nav-item-dropdown.text-right(text='Contact', right='')
          b-dropdown-item.text-right(href='#')
            // Open modal dialog (contact)
            fa(icon='envelope')
            | &nbsp;&nbsp;Send a message online
          b-dropdown-item.text-right(href='tel:+1-412-401-4444')
            fa(icon='phone')
            | &nbsp;&nbsp;Call +1 (412) 401-4444
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GoogleLogin from '@/components/GoogleLogin.vue';

@Component({
  components: {
    GoogleLogin,
  },
})

export default class NavBar extends Vue {
  @Prop({ default: 0 }) private count!: number;
  @Prop({ default: { firstName: 'Guest', lastName: 'User', loggedIn: false, role: 'student' } }) private user!: any;
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

.dropdown-header {
  padding-left: 60px;
}
</style>