import { api } from './api';
import type { CadastroRequest, LoginRequest } from '../types/auth';

export const authService = {
  entrar: (dados: LoginRequest) => api.post('/auth/login', dados).then(() => undefined),

  cadastrar: (dados: CadastroRequest) => api.post('/auth/cadastro', dados).then(() => undefined),
};
