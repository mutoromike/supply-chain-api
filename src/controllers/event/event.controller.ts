import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../../services/event/event.service';
import { EventDto } from '../../common/dtos/event.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/events')
@ApiTags('Events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() eventDto: EventDto) {
    return await this.eventService.createEvent(eventDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getEvent(@Param('id') id: string) {
    return await this.eventService.getEventById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateEvent(@Param('id') id: string, @Body() eventDto: EventDto) {
    return await this.eventService.updateEvent(id, eventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteEvent(@Param('id') id: string) {
    return await this.eventService.deleteEvent(id);
  }
}
