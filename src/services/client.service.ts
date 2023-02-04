import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Client, ClientProps } from '../entities/client.entity';
import { ClientHelper } from '../helpers/client.helper';

import { ClientRepository } from '../repositories/client.repository';
import { maskCPF } from '../utils/client.utils';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(body: ClientProps) {
    const { name, cpf, birthDate } = body;

    const isValidCPF = new ClientHelper().validateCPFDigits(maskCPF(cpf));
    if (!isValidCPF) {
      throw new UnprocessableEntityException('Invalid CPF.');
    }

    const clientOnDB = await this.clientRepository.getByCPF(maskCPF(cpf));
    if (clientOnDB) {
      throw new ConflictException('Client already exist with this CPF.');
    }

    const client = new Client({
      name,
      cpf: maskCPF(cpf),
      birthDate,
    });

    await this.clientRepository.create(client);
    return client;
  }

  async getAll(page?: number, limit?: number) {
    if ((page && !Number(page)) || (limit && !Number(limit))) {
      throw new BadRequestException('Invalid query params');
    }

    const clients = await this.clientRepository.getAll(page, limit);
    return clients;
  }

  async getByCPF(cpf: string) {
    const client = await this.clientRepository.getByCPF(maskCPF(cpf));

    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}
