import Vue from 'vue';
import Api from '@/services/Api';
import braintree from '@/services/Braintree';
import faqs from '@/assets/data/faqs.json';
import { nest } from '@/utils';
import { Store, Role, Item, Product } from '@/types';

// Data to preload

async function clientTokenGet(): Promise<string> {
  const { data } = await Api().get('/api/token');
  return braintree.client.create({ authorization: data });
}

// async function productsGet(): Promise<Product[]> {
//   const { data } = await Api().get('/api/product/active');
//   return data;
// }

export const store: Store = Vue.observable({
  announcementSections: [],
  cart: {
    applePayEnabled: true,
    braintreeError: '',
    count: 0,
    items: [],
    total: 0
  },
  classes: [],
  client: clientTokenGet(), // Promise to Braintree client token
  currentUser: {
    firstName: 'Guest',
    lastName: 'User',
    email: '',
    password: '',
    loggedIn: false,
    role: Role.Student,
    provider: 'local',
    optOut: false,
    googleId: ''
  },
  faqs: [],
  locations: [],
  products: [],
  schedule: [],
  teachers: [],
  workshops: []
});

export const mutations = {
  async announcementsSet(): Promise<void> {
    if (store.announcementSections.length === 0) {
      const { data } = await Api().get('/api/announcement');
      store.announcementSections = data;
    }
  },
  async cartAdd(productId: number): Promise<void> {
    if (store.products.length === 0) {
      await this.productsSet();
    }
    const product: Product | undefined = store.products.find((element: Product) => element._id === productId);
    if (!product) {
      throw new Error('That product ID is invalid.');
    }
    const item: Item | undefined = store.cart.items.find((element: Item) => element.productId === productId);
    if (!item) {
      store.cart.items.push({
        productId,
        productName: product.name,
        price: +product.price,
        quantity: +1,
        total: +product.price
      });
    } else {
      item.quantity++;
      item.total = item.quantity * item.price;
    }
    this.cartRecalculate();
  },
  cartRecalculate(): void {
    store.cart.count = store.cart.items
      .reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    store.cart.total = store.cart.items
      .reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
  },
  cartItemDelete(cartItem: Item): void {
    const index: number = store.cart.items.findIndex((item) => item.productId === cartItem.productId);
    store.cart.count -= store.cart.items[index].quantity;
    store.cart.total -= store.cart.items[index].total;
    store.cart.items.splice(index, 1);
  },
  async clientSet(): Promise<void> {
    if (!store.client) {
      const { data } = await Api().get('/api/token');
      store.client = braintree.client.create({ authorization: data });
    }
  },
  faqsSet(): void {
    if (store.faqs.length === 0) {
      const data: any = faqs;
      store.faqs = data;
    }
  },
  async locationsSet(): Promise<void> {
    if (store.locations.length === 0) {
      const { data } = await Api().get('/api/location/active');
      store.locations = data;
    }
  },
  async productsSet(): Promise<void> {
    if (store.products.length === 0) {
      const { data } = await Api().get('/api/product/active');
      store.products = data;
    }
  },
  async scheduleSet(): Promise<void> {
    if (store.schedule.length === 0) {
      const { data } = await Api().get('/api/schedule');
      store.schedule = nest(data);
    }
  },
  async workshopsSet(): Promise<void> {
    if (store.workshops.length === 0) {
      const { data } = await Api().get('/api/workshop/active');
      store.workshops = data;
    }
  }
};
