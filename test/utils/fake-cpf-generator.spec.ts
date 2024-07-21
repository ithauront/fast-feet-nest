import { fakeCPFGenerator } from './fake-cpf-generator'

function isValidCPF(cpf) {
  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}
describe('cpf generator tests', () => {
  test('if cpf has correct format', () => {
    const cpf = fakeCPFGenerator()
    expect(/^(\d)\1{10}$/.test(cpf)).toBe(false) // regex to check if cpf is all numbers and if its not the same number 11 times
    expect(cpf).toHaveLength(11)
    expect(isValidCPF(cpf)).toBe(true)
  })
})
