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
          span.badge.badge-pill.badge-warning {{ count }}
        b-nav-item(to='/admin', v-if='user.loggedIn && user.role == "admin"') Admin
        b-nav-item(to='/shynet', v-if='user.loggedIn && user.role != "student"') SHYnet
      b-navbar-nav.ml-auto
        LoginDropdown(v-if='!user.loggedIn')
        b-nav-item-dropdown(right='', v-if='user.loggedIn')
          template(slot='button-content')
            fa(icon='user')
            | &nbsp;{{ user.firstName }}
          b-dropdown-item.text-right(to='/profile') Profile
          b-dropdown-item.text-right(to='/logout') Logout
        Contact
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { store, mutations } from '@/store';
import Contact from '@/components/Contact.vue';
import LoginDropdown from '@/components/LoginDropdown.vue';

@Component({
  components: {
    Contact,
    LoginDropdown
  }
})

export default class NavBar extends Vue {
  @Prop({ default: { firstName: 'Guest', lastName: 'User', email: '', password: '',
    loggedIn: false, role: 'student', optOut: false } })
  private user!: any;

  private get count() {
    return store.cart.count;
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
  top: -1px;
  padding: 5px 7px 6px;
}

li>.router-link-exact-active {
  color: gray!important;
}

img.brand {
  height:170px;
  width: 170px;
  margin-top: 20px;
}
</style>