import { EventType } from './event';

export interface ItemType {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  color: string;
  description: string;
  manufacturer: string;
  events: EventType[];
  createdAt: string;
  updatedAt: string;
}
