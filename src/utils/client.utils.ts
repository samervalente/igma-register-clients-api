export function maskCPF(cpf: string) {
  cpf = String(cpf);
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export function formatClientBirthDate(birthDate: string) {
  const splitDate = birthDate.split('/');
  return new Date(
    Number(splitDate[2]),
    Number(splitDate[1]) - 1,
    Number(splitDate[0]),
  );
}
