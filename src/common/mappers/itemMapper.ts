import { Item } from '@prisma/client';
import { ItemType } from '../types/item';
import { EventType } from '../types/event';
import { Event } from '@prisma/client';
import { mapEventToEventType } from './eventMapper';

export async function mapItemToItemType(
  item: Item,
  events: Event[],
): Promise<ItemType> {
  const updatedEvents: EventType[] = [];
  for (const event of events) {
    const eventType = await mapEventToEventType(event);
    updatedEvents.push(eventType);
  }
  return {
    id: item.id,
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    color: item.color,
    description: item.description,
    manufacturer: item.manufacturer,
    events: updatedEvents,
    price: item.price,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}
