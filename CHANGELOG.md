# Product Backlog
* [High] Implement checkout process
* [High] Implement confirmation
* [High] Build User using Vue.observable
* [High] Add Credit Card processing
* [High] Add toast for contact form, subscribe to newsletter, and adding anything to the cart
* [High] Hookup Contact form on NavBar to server
* [High] Hookup Login form on NavBar to server and store token
* [High] GoogleLogin component - login via Oauth to Google (currently /auth/google)
* [High] Create UserManager component for Admin and SHYnet views
* [High] Create components for Admin tabs (Dashboard, UserManager, ScheduleManager, AnnouncementManager, OrderManager, ProductManager, ClassManager, WorkshopManager, LocationManager)
* [Medium] If someone goes to /login, expose the Login dropdown and form

<a name="1.0.0"></a>
* Moved axios requests to created() from mounted() to improve load time
* [Bug] store.ts:cartAdd() uses decimals for item.price, item.total and cart.total
* Built Shopping Cart, and Product List using Vue.observable
* Implemented types.ts in store.ts
* Migrated from Vuex to Vue.observable
* Incorporated old JsonLd component into Workshops normal view
* Changed modals to b-dropdown-form
* [Bug Fix] Weekly does not work in AddToCalendar.vue for Google
* Created Login and Contact components from NavBar.vue elements
* Added Login and Contact as b-dropdown-forms
* Added glob-all purgecss-webpack-plugin path to reduce CSS from 200K to 16.44K
* Created AddToCalendar component
* Created Tweet component or use 3rd party