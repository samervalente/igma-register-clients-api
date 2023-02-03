import { maskCPF } from '../utils/client.utils';

export class ClientHelper {
  validateCPFDigits(cpf: string) {
    let validCPF = cpf.split(/-/)[0].split('.').join('');

    const firstDigit = this.calculateCPFDigit(validCPF);
    validCPF += firstDigit;
    const secondDigit = this.calculateCPFDigit(validCPF);
    validCPF += secondDigit;

    return cpf === maskCPF(validCPF);
  }

  private calculateCPFDigit(cpf: string) {
    let initialMult = 2;
    let totalSum = 0;

    for (let i = cpf.length - 1; i >= 0; i--) {
      const mult = Number(cpf[i]) * initialMult;
      totalSum += mult;
      initialMult++;
    }

    const rest = totalSum % 11;
    return rest >= 2 ? 11 - rest : 0;
  }
}
