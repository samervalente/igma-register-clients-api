import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { validsCPF } from '../src/constants/client.constants';
import { makeClient } from '../test/factories/client.factory';
const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < validsCPF.length; i++) {
    const mockClient = makeClient({ cpf: validsCPF[i], birthDate: faker.date.birthdate() });
    await prisma.client.upsert({
      where: {
        cpf: mockClient.cpf,
      },
      update: {},
      create: mockClient,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
