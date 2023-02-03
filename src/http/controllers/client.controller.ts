import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateClientBody } from '../../dtos/client.dto';
import { ClientProps } from '../../entities/client.entity';
import { ClientService } from '../../services/client.service';

@Controller('/clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  async create(@Body() body: CreateClientBody): Promise<void> {
    await this.clientService.create(body);
  }

  @Get()
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<ClientProps[]> {
    const clients = await this.clientService.getAll(page, limit);
    return clients;
  }
}
