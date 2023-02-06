import { ClientProps } from '../entities/client.entity';
import { CreateClientType } from './prisma/prisma.client.repository';

export abstract class ClientRepository {
  abstract getByCPF(cpf: string): Promise<ClientProps>;
  abstract create(client: CreateClientType): Promise<void>;
  abstract getAll(page?: number, limit?: number): Promise<ClientProps[]>;
}
