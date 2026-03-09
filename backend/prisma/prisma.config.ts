import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const config = {
  datasources: [
    {
      name: 'db',
      url: process.env.DATABASE_URL,
    },
  ],
  // Optional: other Prisma client configurations
};

export default config;