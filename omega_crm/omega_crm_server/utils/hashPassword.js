import bcrypt from 'bcrypt';

export default async function hashPassword (plainTextPassword) {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};