import { ClientRepository } from '../../src/repositories/client.repository';
import { Client } from '../../src/entities/client.entity';
import { maskCPF } from '../../src/utils/client.utils';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async create(client: Client) {
    this.clients.push(client);
  }

  async getByCPF(cpf: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.cpf === maskCPF(cpf));
    return client ? client : null;
  }

  async getAll(page?: number, limit?: number): Promise<Client[]> {
    if (page && limit) {
      const clients = [];
      for (let i = page * limit - limit; i < page * limit; i++) {
        clients.push(this.clients[i]);
      }
      return clients.filter((client) => client);
    }

    return this.clients;
  }
}
