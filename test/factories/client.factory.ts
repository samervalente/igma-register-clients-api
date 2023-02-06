import { ClientProps } from '../../src/entities/client.entity';
import { faker } from '@faker-js/faker';

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
  const validsCPF = [
    '862.147.780-75',
    '700.851.490-55',
    '990.298.490-88',
    '898.545.140-56',
    '744.390.360-07',
    '530.399.740-50',
    '971.276.840-65',
    '930.152.740-58',
    '589.229.820-55',
    '571.847.180-03',
    '964.202.180-39',
    '064.706.150-31',
  ];

  const clients = [];
  const condition = quantity ?? validsCPF.length;

  for (let i = 0; i < condition; i++) {
    const mockClient = makeClient({ cpf: validsCPF[i] });
    clients.push(mockClient);
  }

  return clients;
}
