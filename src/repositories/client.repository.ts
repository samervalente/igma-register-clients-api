import { ClientProps } from '../entities/client.entity';
import { CreateClientType } from './prisma/client.repository';

export abstract class ClientRepository {
  abstract findByCPF(cpf: string): Promise<ClientProps>;
  abstract create(client: CreateClientType): Promise<void>;
  abstract getAll(page?: number, limit?: number): Promise<ClientProps[]>;
}
