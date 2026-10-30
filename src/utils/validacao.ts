const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const TAMANHO_MINIMO_SENHA = 8;

export function emailValido(email: string): boolean {
  return PADRAO_EMAIL.test(email.trim());
}
