import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/authentication/auth.module';
import { ItemModule } from './modules/item/item.module';
import { EventModule } from './modules/event/event.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

@Module({
  imports: [AuthModule, ItemModule, EventModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
