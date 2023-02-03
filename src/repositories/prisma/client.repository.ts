import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/database/prisma.config';
import { ClientProps } from '../../entities/client.entity';
import { ClientRepository } from '../client.repository';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create({ name, cpf, birthDate }: ClientProps): Promise<void> {
    await this.prisma.client.create({
      data: {
        name,
        cpf,
        birthDate,
      },
    });
  }
}
