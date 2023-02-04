import { Client, ClientProps } from '../../src/entities/client.entity';

type Override = Partial<ClientProps>;

export function createClient(override: Override = {}) {
  return new Client({
    name: 'Samer Valente',
    cpf: '06503574266',
    birthDate: '02/05/2003',
    ...override,
  });
}
