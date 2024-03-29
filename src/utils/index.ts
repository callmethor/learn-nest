import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const isMatch = async (
  password: string | undefined,
  hash: string | undefined,
) => {
  return await bcrypt.compare(password, hash);
};
