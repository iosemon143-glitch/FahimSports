export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  subtitle: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: {
    iconName: 'wind' | 'droplets' | 'feather' | 'shield';
    title: string;
  }[];
  sizes: string[];
}

export type CategoryId = 'all' | 'jersey' | 'trouser' | 'football' | 'cricket' | 'shoes' | 'accessories';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
}

export type NavTab = 'home' | 'messages' | 'wishlist' | 'chat' | 'facebook' | 'social';

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'cod' | 'card' | 'apple';

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  estimatedDelivery: string;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  courierName?: string;
  trackingNumber?: string;
}
