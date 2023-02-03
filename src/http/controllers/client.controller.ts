import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientBody } from '../../dtos/client.dto';
import { ClientService } from '../../services/client.service';
import { maskCPF } from '../../utils/client.utils';

@Controller('/clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  async create(@Body() body: CreateClientBody): Promise<void> {
    await this.clientService.create({
      ...body,
      cpf: maskCPF(body.cpf),
    });
  }
}
