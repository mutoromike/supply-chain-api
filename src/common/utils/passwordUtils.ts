import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  return isPasswordValid;
}
