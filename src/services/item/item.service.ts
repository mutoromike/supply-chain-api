import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ItemDto } from '../../common/dtos/item.dto';
// import { }
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemEvents,
} from 'src/repositories/item/itemRepository';
import { mapItemToItemType } from 'src/common/mappers/itemMapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getItemEvents(id: string) {
    await this.checkItemExists(id);
    const events = getItemEvents(id);
    return events;
  }
  async createItem(itemDto: ItemDto) {
    try {
      const item = await createItem(itemDto);
      const events = await getItemEvents(item.id);
      return mapItemToItemType(item, events);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Item SKU already exists',
            HttpStatus.CONFLICT,
          );
        }
        throw new HttpException('An Error Occurred', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('An Error Occurred', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllItems() {
    try {
      const items = await getAllItems();
      const updatedItems = [];
      for (const item of items) {
        const events = await getItemEvents(item.id);
        updatedItems.push(await mapItemToItemType(item, events));
      }
      return updatedItems;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getItemById(id: string) {
    const item = await this.checkItemExists(id);
    const events = await getItemEvents(id);
    return await mapItemToItemType(item, events);
  }

  async updateItem(id: string, itemDto: ItemDto) {
    await this.checkItemExists(id);
    return await updateItem(id, itemDto);
  }

  async deleteItem(id: string) {
    await this.checkItemExists(id);
    return await deleteItem(id);
  }

  async checkItemExists(id: string) {
    const item = await getItemById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }
}
