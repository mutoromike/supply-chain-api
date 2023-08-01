import { Event } from '@prisma/client';
import { EventType } from '../types/event';

export async function mapEventToEventType(event: Event): Promise<EventType> {
  return {
    id: event.id,
    name: event.name,
    custodian: event.custodian,
    status: event.status,
    location: event.location,
    condition: event.condition,
    eventType: event.eventType,
    description: event.description,
    itemId: event.itemId,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}
