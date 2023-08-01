import { PrismaClient, Item } from '@prisma/client';
import { ItemDto } from '../../common/dtos/item.dto';

const prisma = new PrismaClient();

export async function createItem(itemDto: ItemDto): Promise<Item> {
  const newItem = await prisma.item.create({
    data: itemDto,
  });
  return newItem;
}

export async function getItemById(id: string): Promise<Item | null> {
  return prisma.item.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getAllItems(): Promise<Item[] | []> {
  return prisma.item.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function updateItem(
  id: string,
  itemDto: ItemDto,
): Promise<Item | null> {
  const updatedItem = await prisma.item.update({
    where: { id },
    data: itemDto,
    include: { events: true },
  });
  return updatedItem;
}

export async function deleteItem(
  id: string,
): Promise<{ status: string; message: string } | null> {
  try {
    await prisma.$transaction(async (transactionalPrisma) => {
      const item = await transactionalPrisma.item.findUnique({
        where: { id: id },
        include: { events: true },
      });
      if (!item) {
        throw new Error('Item not found');
      }
      await transactionalPrisma.event.deleteMany({
        where: { itemId: id },
      });
      await transactionalPrisma.item.delete({
        where: { id: id },
      });
    });
    return {
      status: 'Success',
      message: 'Item and its events have been deleted successfully.',
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItemEvents(id: string) {
  const events = await prisma.event.findMany({
    where: { itemId: id },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return events;
}
