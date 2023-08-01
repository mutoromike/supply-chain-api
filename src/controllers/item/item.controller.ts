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
import { ItemService } from '../../services/item/item.service';
import { ItemDto } from '../../common/dtos/item.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/items')
@ApiTags('Items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createItem(@Body() itemDto: ItemDto) {
    return await this.itemService.createItem(itemDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllItems() {
    return await this.itemService.getAllItems();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getItem(@Param('id') id: string) {
    return await this.itemService.getItemById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateItem(@Param('id') id: string, @Body() itemDto: ItemDto) {
    return await this.itemService.updateItem(id, itemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(id);
  }

  // get item events
  @Get(':id/events')
  @UseGuards(JwtAuthGuard)
  async getItemEvents(@Param('id') id: string) {
    return await this.itemService.getItemEvents(id);
  }
}
