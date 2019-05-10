// import Vue from 'vue';

// declare module 'vue/types/vue' {
//   interface Vue {

//   }
// }
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loggedIn: boolean;
  role: Role;
  provider: string;
  optOut: boolean;
  googleId: string;
}

export interface Announcement {
  title: string;
  description: string;
  expires: Date;
}

export interface AnnouncementSection {
  section: string;
  announcements: Announcement[];
}

export interface Item {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  applePayEnabled: boolean;
  braintreeError: string;
  count: number;
  items: Item[];
  total: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Location {
  _id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  map: string;
  street: string;
  directions: string;
  review: string;
  note1: string;
  note2: string;
}

export interface Product {
  _id: number;
  name: string;
  price: number;
  active: boolean;
}

export interface Teacher {
  firstName: string;
  lastName: string;
  bio: string;
  imageId: number;
  url: string;
}

export interface YogaClass {
  _id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface YogaClassEvent {
  _id: number;
  location: Location;
  day: number;
  class: YogaClass;
  teacher: Teacher;
}

export interface WorkshopSection {
  _id: number;
  title: string;
  description: string;
  hideDate: boolean;
  starts: Date;
  ends: Date;
  product: Product;
  location: Location;
}

export interface Workshop {
  _id: number;
  title: string;
  description: string;
  imageId: number;
  ends: Date;
  sections: WorkshopSection[];
}

export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export interface Store {
  announcementSections: AnnouncementSection[];
  cart: Cart;
  classes: YogaClass[];
  currentUser: User;
  faqs: Faq[];
  locations: Location[];
  products: Product[];
  schedule: YogaClassEvent[];
  teachers: Teacher[];
  workshops: Workshop[];
}
