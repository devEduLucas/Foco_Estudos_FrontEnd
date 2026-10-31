import { api } from './api';
import { sessao } from './sessao';
import type { CadastroRequest, LoginRequest, LoginResponse } from '../types/auth';

export const authService = {
  entrar: (dados: LoginRequest) =>
    api.post<LoginResponse>('/auth/login', dados).then((resposta) => sessao.salvar(resposta.data)),

  cadastrar: (dados: CadastroRequest) => api.post('/auth/cadastro', dados).then(() => undefined),

  sair: sessao.limpar,
};
