import { Injectable } from '@nestjs/common';
import { ClientProps } from '../entities/client.entity';
import { ClientRepository } from '../repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(client: ClientProps) {
    await this.clientRepository.create(client);
  }
}
