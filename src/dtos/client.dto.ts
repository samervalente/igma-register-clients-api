import { IsNotEmpty, Length } from 'class-validator';

export class CreateClientBody {
  @IsNotEmpty({ message: 'The client name should not be empty' })
  name: string;

  @IsNotEmpty({
    message: 'The client cpf should not be empty',
  })
  @Length(11, 14, {
    message: 'The client cpf must have at least 11 or 14 characters',
  })
  cpf: string;

  @IsNotEmpty()
  birthDate: string;
}
