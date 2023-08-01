import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Event } from '@prisma/client';
import { EventDto } from 'src/common/dtos/event.dto';
import {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from 'src/repositories/event/eventRepository';
import { mapEventToEventType } from 'src/common/mappers/eventMapper';
import { EventType } from 'src/common/types/event';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(eventDto: EventDto) {
    try {
      const event = await createEvent(eventDto);
      return await this.returnSuccessMessage(
        'Created',
        HttpStatus.CREATED,
        await mapEventToEventType(event),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEventById(id: string) {
    const event = await this.checkEventExists(id);
    return await this.returnSuccessMessage(
      'Retrieved',
      HttpStatus.OK,
      await mapEventToEventType(event),
    );
  }

  async updateEvent(id: string, eventDto: EventDto) {
    await this.checkEventExists(id);
    const updatedEvent = await updateEvent(id, eventDto);
    return this.returnSuccessMessage(
      'Updated',
      HttpStatus.OK,
      await mapEventToEventType(updatedEvent),
    );
  }

  async deleteEvent(id: string) {
    await this.checkEventExists(id);
    const deletedEvent = await deleteEvent(id);
    return this.returnSuccessMessage(
      'Deleted',
      HttpStatus.OK,
      deletedEvent.data,
    );
  }

  async checkEventExists(id: string) {
    const event = await getEventById(id);
    if (!event) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async returnSuccessMessage(
    message: string,
    status: HttpStatus,
    data: EventType | string,
  ) {
    return {
      statusCode: `${status}`,
      message: `Event ${message} Successfully`,
      data: data,
    };
  }
}
