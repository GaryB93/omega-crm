import bcrypt from 'bcrypt';

export default async function passwordMatches (plainTextPassword, hashedPassword) {
  try {
    const result = await bcrypt.compare(plainTextPassword, hashedPassword);
    return result;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};