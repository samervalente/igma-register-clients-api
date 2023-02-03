export interface ClientProps {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
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
    return this.props.name;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get birthDate(): string {
    return this.props.name;
  }

  public set birthDate(birthDate: string) {
    this.props.birthDate = birthDate;
  }
}
