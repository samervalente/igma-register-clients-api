import { ConflictException, Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client.repository';
import { CreateClientType } from '../repositories/prisma/client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(client: CreateClientType) {
    const clientOnDB = await this.clientRepository.findByCPF(client.cpf);
    if (clientOnDB) {
      throw new ConflictException('Client already exist with this CPF.');
    }

    await this.clientRepository.create(client);
  }
}
