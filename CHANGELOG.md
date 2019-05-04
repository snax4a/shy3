# Product Backlog
* [Bug] Weekly does not work in AddToCalendar.vue for Google
* [High] Add toast for contact form, subscribe to newsletter, and adding anything to the cart
* [High] Hookup Contact form on NavBar to server
* [High] Hookup Login form on NavBar to server and store token
* [High] Build ShoppingCart, ProductList, and User using Vuex
* [High] Create Shopping Cart as dropdown form like login
* [High] GoogleLogin component - login via Oauth to Google (currently /auth/google)
* [High] Create UserManager component for Admin and SHYnet views
* [High] Create components for Admin tabs (Dashboard, UserManager, ScheduleManager, AnnouncementManager, OrderManager, ProductManager, ClassManager, WorkshopManager, LocationManager)
* [High] Change modals to b-dropdown-form
* [Medium] Incorporate old JsonLd component into Workshops normal view
* [Medium] If someone goes to /login, expose the Login dropdown and form
* [Low] Implement types.ts in store.ts

<a name="1.0.0"></a>
* Created Login and Contact components from NavBar.vue elements
* Added Login and Contact as b-dropdown-forms
* Added glob-all purgecss-webpack-plugin path to reduce CSS from 200K to 16.44K
* Created AddToCalendar component
* Created Tweet component or use 3rd party