import { Module } from '@nestjs/common';
import { EventController } from 'src/controllers/event/event.controller';
import { EventService } from 'src/services/event/event.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
  imports: [],
})
export class EventModule {}
