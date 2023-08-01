import { PrismaClient, Event } from '@prisma/client';
import { EventDto } from 'src/common/dtos/event.dto';

const prisma = new PrismaClient();

export async function createEvent(eventDto: EventDto): Promise<Event> {
  const newEvent = await prisma.event.create({
    data: eventDto,
  });
  return newEvent;
}

export async function getEventById(id: string): Promise<Event | null> {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });
  return event;
}

export async function updateEvent(id: string, eventDto: EventDto) {
  const updatedEvent = await prisma.event.update({
    where: { id },
    data: eventDto,
  });
  return updatedEvent;
}

export async function deleteEvent(id: string) {
  try {
    await prisma.$transaction(async (transactionalPrisma) => {
      const event = await transactionalPrisma.event.findUnique({
        where: { id: id },
      });
      if (!event) {
        throw new Error('Event not found');
      }
      await transactionalPrisma.event.delete({
        where: { id: id },
      });
    });
    return {
      data: 'Event Deleted',
    };
  } catch (error) {
    throw new Error(error);
  }
}
