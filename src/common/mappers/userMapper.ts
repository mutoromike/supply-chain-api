import { User } from '@prisma/client';
import { UserType } from '../types/auth';

export function mapUserToUserType(user: User): UserType {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    address: user.address,
  };
}
