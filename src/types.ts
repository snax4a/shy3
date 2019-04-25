export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loggedIn: boolean;
  role: Role;
  provider: string;
  optOut: boolean;
}

export interface Announcement {
  title: string;
  description: string;
  expires: Date;
}

export interface AnnouncementSection {
  name: string;
  announcements: Announcement[];
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
  id: number;
  name: string;
  price: number;
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

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  applePayEnabled: boolean;
  braintreeError: string;
  itemCount: number;
  items: CartItem[];
  grandTotal: number;
}

export enum Role {
  Student,
  Teacher,
  Admin,
}

export interface RootState {
  announcementSections: AnnouncementSection[];
  sections: WorkshopSection[];
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
