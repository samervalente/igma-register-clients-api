import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientHelper } from '../helpers/client.helper';

import { ClientRepository } from '../repositories/client.repository';
import { CreateClientType } from '../repositories/prisma/client.repository';
import { maskCPF } from '../utils/client.utils';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(client: CreateClientType) {
    client.cpf = maskCPF(client.cpf);

    const isValidCPF = new ClientHelper().validateCPFDigits(client.cpf);
    if (!isValidCPF) {
      throw new UnprocessableEntityException('Invalid CPF.');
    }

    const clientOnDB = await this.clientRepository.findByCPF(client.cpf);
    if (clientOnDB) {
      throw new ConflictException('Client already exist with this CPF.');
    }

    await this.clientRepository.create(client);
  }

  async getAll(page?: number, limit?: number) {
    if (!Number(page) || !Number(limit)) {
      throw new BadRequestException('Invalid query params');
    }

    const clients = await this.clientRepository.getAll(page, limit);
    return clients;
  }
}
