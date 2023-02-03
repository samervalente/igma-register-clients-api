import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateClientBody {
  @IsNotEmpty({ message: 'The client name should not be empty' })
  @MinLength(2, {
    message: 'The client name should have at least 2 characters',
  })
  name: string;

  @IsNotEmpty({
    message: 'The client cpf should not be empty',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  @Matches(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/, {
    message: 'Invalid CPF Format',
  })
  cpf: string;

  @IsNotEmpty({ message: 'The client birthDate should not be empty' })
  @IsString({ message: 'The client birth date mt be a string' })
  @Matches(/([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/, {
    message: 'birthDate must be in DD/MM/YYYY format',
  })
  birthDate: string;
}
