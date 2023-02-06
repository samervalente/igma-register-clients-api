import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { CreateClientBody } from '../dtos/client.dto';
import { ClientHelper } from '../helpers/client.helper';
import { formatClientBirthDate, maskCPF } from '../utils/client.utils';

@Injectable()
export class ClientMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { name, cpf, birthDate } = req.body;
    const client = new CreateClientBody();
    client.name = name;
    client.cpf = cpf;
    client.birthDate = birthDate;

    const errors = await validate(client);
    if (errors.length > 0) {
      const allErrors = errors.map((error) => ({
        constraints: error.constraints,
      }));
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        statusCode: 422,
        error: 'Unprocessable Entity',
        messages: allErrors,
      });
    }

    const isValidCPF = new ClientHelper().validateCPFDigits(maskCPF(cpf));
    if (!isValidCPF) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        statusCode: 422,
        message: 'Invalid CPF digits.',
        error: 'Unprocessable Entity',
      });
    }

    const formatedBirthDate = formatClientBirthDate(client.birthDate);

    res.locals.client = {
      ...req.body,
      birthDate: formatedBirthDate,
    };

    next();
  }
}
