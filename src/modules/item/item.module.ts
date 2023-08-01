import { Module } from '@nestjs/common';
import { ItemController } from 'src/controllers/item/item.controller';
import { ItemService } from 'src/services/item/item.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  imports: [],
})
export class ItemModule {}
