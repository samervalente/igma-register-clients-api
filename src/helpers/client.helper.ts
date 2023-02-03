import { maskCPF } from '../utils/client.utils';

function calculateCPFDigit(cpf: string, multValues: number[]) {
  let digit = 0;
  let totalSum = 0;

  for (let i = 0; i < cpf.length; i++) {
    const mult = Number(cpf[i]) * multValues[i];
    totalSum += mult;
  }

  const rest = totalSum % 11;

  if (rest >= 2) {
    digit = 11 - rest;
  }

  return digit;
}

export function validateCPF(bodyCPF: string) {
  let validCPF = bodyCPF.split(/-/)[0].split('.').join('');

  const multValues = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstDigit = calculateCPFDigit(validCPF, multValues);
  validCPF += firstDigit;
  multValues.unshift(11);
  const secondDigit = calculateCPFDigit(validCPF, multValues);
  validCPF += secondDigit;

  if (bodyCPF !== maskCPF(validCPF)) {
    return false;
  }

  return true;
}
