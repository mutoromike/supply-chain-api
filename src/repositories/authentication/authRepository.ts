import { HttpException } from '@nestjs/common';
import { PrismaClient, Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/common/dtos/auth.dto';
import { hashPassword } from 'src/common/utils/passwordUtils';

const prisma = new PrismaClient();

export async function createUser(createUserDto: CreateUserDto): Promise<User> {
  const hashedPassword = await hashPassword(createUserDto.password);
  const newUser = await prisma.user.create({
    data: {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
      email: createUserDto.email,
      address: createUserDto.address,
      password: hashedPassword,
    },
  });
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}
