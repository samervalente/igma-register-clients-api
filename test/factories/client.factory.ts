import { ClientProps } from '../../src/entities/client.entity';
import { faker } from '@faker-js/faker';
import { validsCPF } from '../../src/constants/client.constants';

type Override = Partial<ClientProps>;

//faker.date.birthdate({ min: 1920, max: 2000 })
export function makeClient(override: Override = {}) {
  return {
    name: faker.name.fullName(),
    cpf: '065.035.742-66',
    birthDate: '02/05/2003',
    ...override,
  };
}

export function makeManyClients(quantity?: number) {
  const clients = [];
  const condition = quantity ?? validsCPF.length;

  for (let i = 0; i < condition; i++) {
    const mockClient = makeClient({ cpf: validsCPF[i] });
    clients.push(mockClient);
  }

  return clients;
}
