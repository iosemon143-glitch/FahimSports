import { Order } from '../types';
import { PRODUCTS } from './mockData';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SP-99201',
    date: 'Today, 10:45 AM',
    status: 'shipped',
    estimatedDelivery: 'Today, by 3:30 PM',
    paymentMethod: 'bkash',
    shippingAddress: 'House 14, Road 7, Banani, Dhaka',
    courierName: 'RedX Express Priority',
    trackingNumber: 'RX-8849201-BD',
    totalAmount: 2450,
    items: [
      {
        product: PRODUCTS[1], // Football Shoes
        size: '9',
        quantity: 1,
        price: 2450,
      },
    ],
  },
  {
    id: 'SP-84102',
    date: 'Sep 4, 2026, 02:15 PM',
    status: 'delivered',
    estimatedDelivery: 'Delivered on Sep 5, 2026',
    paymentMethod: 'cod',
    shippingAddress: 'House 14, Road 7, Banani, Dhaka',
    courierName: 'Steadfast Courier',
    trackingNumber: 'ST-5510293-BD',
    totalAmount: 850,
    items: [
      {
        product: PRODUCTS[0], // Football Jersey
        size: 'M',
        quantity: 1,
        price: 850,
      },
    ],
  },
];
