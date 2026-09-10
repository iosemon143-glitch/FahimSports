import { Order } from '../types';

// Fresh installs start with no fabricated customer/order history.
// Real orders are added by the checkout flow and persisted locally.
export const INITIAL_ORDERS: Order[] = [];
