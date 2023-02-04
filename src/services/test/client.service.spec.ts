import { InMemoryClientRepository } from '../../../test/repositories/in-memory-client.repository';
import { ClientService } from '../client.service';
import { makeClient } from '../../../test/factories/client.factory';

describe('Tests for create clients', () => {
  it('should able to create a client', async () => {
    const clientRepository = new InMemoryClientRepository();
    const clientService = new ClientService(clientRepository);

    const createdClient = await clientService.create({
      name: 'Samer Valente',
      cpf: '06503574266',
      birthDate: '02/05/2003',
    });

    expect(clientRepository.clients).toHaveLength(1);
    expect(clientRepository.clients[0]).toEqual(createdClient);
  });
});
