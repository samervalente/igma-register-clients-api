import { ClientProps } from '../entities/client.entity';

export abstract class ClientRepository {
  abstract create(client: ClientProps): Promise<void>;
}
