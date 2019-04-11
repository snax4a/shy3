<template lang='pug'>
b-navbar(toggleable='md', type='light')
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
        b-nav-item(to='/cart')
          fa(icon='shopping-cart')
          | &nbsp;Cart
      // Right aligned nav items
      b-navbar-nav.ml-auto
        b-nav-item(to='/login') Login
        b-nav-item-dropdown(text='Contact', right='')
          b-dropdown-item(href='#')
            fa(icon='envelope')
            | &nbsp;&nbsp;Send a message online
          b-dropdown-item(href='tel:+1-412-401-4444')
            fa(icon='phone')
            | &nbsp;&nbsp;Call +1 (412) 401-4444

// .navbar.navbar-default.navbar-static-top
//   .container
//     .navbar-header
//       button.navbar-toggle(type='button', ng-click='$ctrl.isCollapsed = !$ctrl.isCollapsed')
//         span.sr-only Toggle navigation
//         //- span.fas.fa-bars
//         span.icon-bar
//         span.icon-bar
//         span.icon-bar
//       router-link.navbar-brand(to='/', ng-class='{active: $ctrl.isActive("/")}') 
//         img(src='/assets/images/logo-192x192.png', srcset='/assets/images/logo.svg', alt='Schoolhouse Yoga Pittsburgh seal' style='height:170px; width: 170px;')
//     #navbar-main.navbar-collapse.collapse(uib-collapse='$ctrl.isCollapsed')
//       ul.nav.navbar-nav
//         li(ng-class='{active: $ctrl.isActive("/classes")}')
//           a(ng-href='/classes', ng-click='$ctrl.isCollapsed = true') Classes
//         li(ng-class='{active: $ctrl.isActive("/workshops")}')
//           a(ng-href='/workshops', ng-click='$ctrl.isCollapsed = true') Workshops
//         li.visible-xs(ng-class='{active: $ctrl.isActive("/teachertraining")}')
//           a(ng-href='/teachertraining', ng-click='$ctrl.isCollapsed = true') 200-hour Teacher Training
//         li.visible-xs(ng-class='{active: $ctrl.isActive("/locations")}')
//           a(ng-href='/locations', ng-click='$ctrl.isCollapsed = true') Directions
//         li.visible-xs(ng-class='{active: $ctrl.isActive("/teachers")}')
//           a(ng-href='/teachers', ng-click='$ctrl.isCollapsed = true') Teachers
//         li(ng-if='$ctrl.Cart.getTotalItems() > 0', ng-class='{active: $ctrl.isActive("/cart")}')
//           a(ng-href='/checkout', ng-click='$ctrl.isCollapsed = true')
//             span.fas.fa-shopping-cart 
//             | &nbsp;Cart 
//             span.badge {{ $ctrl.Cart.getTotalItems() }}
//         li(ng-show='$ctrl.isAdmin()', ng-class='{active: $ctrl.isActive("/admin")}')
//           a(href='/admin') Admin
//         li(ng-show='$ctrl.isAdminOrTeacher()', ng-class='{active: $ctrl.isActive("/shynet")}')
//           a(href='/shynet') SHYnet
//       ul.nav.navbar-nav.navbar-right
//         li(ng-show='!$ctrl.isLoggedIn()')
//           a(href='/login') Login
//         li(uib-dropdown='', ng-show='$ctrl.isLoggedIn()')
//           a(id='username', href='#', uib-dropdown-toggle='') 
//             span.fas.fa-user 
//             | &nbsp;{{ $ctrl.getCurrentUser().firstName }} 
//             span.caret
//           ul.dropdown-menu(uib-dropdown-menu='')
//             li(ng-class='{active: $ctrl.isActive("/profile")}')
//               a(id='profile', href='/profile') Profile
//             li
//               a(id='logout', href='/logout') Logout
//         li(uib-dropdown='')
//           a(id='contact', href='#', uib-dropdown-toggle='')
//             | Contact 
//             span.caret
//           ul.dropdown-menu(uib-dropdown-menu='')
//             li
//               a(id='message', ng-click='$ctrl.contactModalOpen()')
//                 span.far.fa-envelope(aria-hidden='true')
//                 | &nbsp;&nbsp;Send a message online
//             li
//               a(id='call', href='tel:+1-412-401-4444')
//                 span.fas.fa-phone(aria-hidden='true')
//                 | &nbsp;&nbsp;Call +1 (412) 401-4444
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {}
</script>

<style scoped lang="scss">
img.brand {
  height:170px;
  width: 170px;
}
</style>