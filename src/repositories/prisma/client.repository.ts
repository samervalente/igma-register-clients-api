import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.config';
import { ClientProps } from '../../entities/client.entity';
import { ClientRepository } from '../client.repository';

export type CreateClientType = Omit<ClientProps, 'id'>;

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async getByCPF(cpf: string): Promise<ClientProps> {
    const client = await this.prisma.client.findUnique({ where: { cpf } });
    return client;
  }

  async create({ name, cpf, birthDate }: CreateClientType): Promise<void> {
    await this.prisma.client.create({
      data: {
        name,
        cpf,
        birthDate,
      },
    });
  }

  async getAll(page?: number, limit?: number): Promise<ClientProps[]> {
    const clients = await this.prisma.client.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
    });

    return clients;
  }
}
