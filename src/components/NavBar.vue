<template lang='pug'>
b-navbar(toggleable='md', type='primary')
  .container
    b-navbar-brand(to='/')
      img.brand(src='/img/logo-512x512.png', srcset='/img/logo.svg', alt='Schoolhouse Yoga Pittsburgh seal')
    b-navbar-toggle(target='nav-collapse')
    b-collapse#nav-collapse(is-nav='')
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
        b-nav-item(to='/login', v-if='!user.loggedIn') Login
        b-nav-item-dropdown(right='', v-if='user.loggedIn')
          template(slot='button-content')
            fa(icon='user')
            | &nbsp;{{ user.firstName }}
          b-dropdown-item(to='/profile') Profile
          b-dropdown-item(to='/logout') Logout
        b-nav-item-dropdown(text='Contact', right='')
          b-dropdown-item(href='#')
            // Open modal dialog (contact)
            fa(icon='envelope')
            | &nbsp;&nbsp;Send a message online
          b-dropdown-item(href='tel:+1-412-401-4444')
            fa(icon='phone')
            | &nbsp;&nbsp;Call +1 (412) 401-4444
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  @Prop({ default: 0 }) private count!: number;
  @Prop({ default: { firstName: 'Guest', lastName: 'User', loggedIn: false, role: 'student' } }) private user!: any;
}
</script>

<style scoped lang="scss">
.badge {
	position: relative;
	top: -2px;
}

.dropdown-item {
  color: $brand-base!important;
}

.dropdown-item:hover {
  color: orange!important;
}

li>.router-link-exact-active {
  background-image: linear-gradient(180deg,#dbdbdb 0,#e2e2e2);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#FFDBDBDB",endColorstr="#FFE2E2E2",GradientType=0);
  background-repeat: repeat-x;
  box-shadow: inset 0 3px 9px rgba(0,0,0,.075);
}

img.brand {
  height:170px;
  width: 170px;
}
</style>