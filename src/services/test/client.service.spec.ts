import { InMemoryClientRepository } from '../../../test/repositories/in-memory-client.repository';
import { ClientService } from '../client.service';

import {
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('Tests for create clients service', () => {
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

  it('should not be able to create a client with invalid CPF', async () => {
    const clientRepository = new InMemoryClientRepository();
    const clientService = new ClientService(clientRepository);
    const invalidCPF = '06503574238';

    expect(
      async () =>
        await clientService.create({
          name: 'Samer Valente',
          cpf: invalidCPF,
          birthDate: '02/05/2003',
        }),
    ).rejects.toThrow(UnprocessableEntityException);
    expect(clientRepository.clients).toHaveLength(0);
  });

  it('should not be able to create a client with existing CPF', async () => {
    const clientRepository = new InMemoryClientRepository();
    const clientService = new ClientService(clientRepository);

    await clientService.create({
      name: 'Samer Valente',
      cpf: '06503574266',
      birthDate: '02/05/2003',
    });

    expect(
      async () =>
        await clientService.create({
          name: 'Filipe Valente',
          cpf: '06503574266',
          birthDate: '19/10/1999',
        }),
    ).rejects.toThrow(ConflictException);
    expect(clientRepository.clients).toHaveLength(1);
  });
});

describe('Tests for get client by CPF service', () => {
  it('should be able to get a client with valid CPF', async () => {
    const clientRepository = new InMemoryClientRepository();
    const clientService = new ClientService(clientRepository);

    const createdClient = await clientService.create({
      name: 'Samer Valente',
      cpf: '06503574266',
      birthDate: '02/05/2003',
    });

    const foundClient = await clientService.getByCPF('065.035.742-66');
    expect(foundClient).toEqual(createdClient);
  });

  it('should not be able to get a client with non existing CPF', async () => {
    const clientRepository = new InMemoryClientRepository();
    const clientService = new ClientService(clientRepository);

    expect(
      async () => await clientService.getByCPF('123.456.789-10'),
    ).rejects.toThrow(NotFoundException);
  });
});
