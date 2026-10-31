import type { LoginResponse } from '../types/auth';

const CHAVE = 'focoestudos.sessao';

function expirado(token: string): boolean {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload)) as { exp?: number };
    return typeof exp === 'number' && exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export const sessao = {
  salvar: (resposta: LoginResponse) => localStorage.setItem(CHAVE, JSON.stringify(resposta)),

  limpar: () => localStorage.removeItem(CHAVE),

  /** Token válido (existente e não expirado); limpa a sessão se estiver expirado. */
  token(): string | null {
    try {
      const salva = localStorage.getItem(CHAVE);
      const token = salva ? (JSON.parse(salva) as LoginResponse).token : null;
      if (token && !expirado(token)) return token;
    } catch {
      // sessão corrompida: tratada como ausente
    }
    sessao.limpar();
    return null;
  },

  autenticada: () => sessao.token() !== null,
};
