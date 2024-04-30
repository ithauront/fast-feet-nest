export function fakeCPFGenerator() {
  let cpf = ''
  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    const digit = Math.floor(Math.random() * 9)
    cpf += digit.toString()
    sum += digit * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  cpf += remainder

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  cpf += remainder

  return cpf
}
