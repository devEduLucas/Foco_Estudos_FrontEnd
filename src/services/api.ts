import axios from 'axios';
import { sessao } from './sessao';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = sessao.token();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 fora de /auth = sessão inválida ou expirada: volta para o login.
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (axios.isAxiosError(erro) && erro.response?.status === 401 && !erro.config?.url?.startsWith('/auth/')) {
      sessao.limpar();
      window.location.replace('/entrar');
    }
    return Promise.reject(erro);
  },
);
