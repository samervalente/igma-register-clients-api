export interface ClientProps {
  id?: string;
  name: string;
  cpf: string;
  birthDate: Date;
}

export class Client {
  private props: ClientProps;

  constructor(props: ClientProps) {
    this.props = { ...props };
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get birthDate(): Date {
    return this.props.birthDate;
  }

  public set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
  }
}
