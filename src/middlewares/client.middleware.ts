import {
  Injectable,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validateCPF } from '../helpers/client.helper';
import { maskCPF } from '../utils/client.utils';

@Injectable()
export class ClientMiddlware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isValidCPF = validateCPF(maskCPF(req.body.cpf));
    if (!isValidCPF) {
      throw new UnprocessableEntityException('Invalid CPF.');
    }

    next();
  }
}
