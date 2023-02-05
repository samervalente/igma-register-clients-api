import { ClientProps } from '../../src/entities/client.entity';

type Override = Partial<ClientProps>;

export function makeClient(override: Override = {}) {
  return {
    name: 'Samer Valente',
    cpf: '065.035.742-66',
    birthDate: '02/05/2003',
    ...override,
  };
}
