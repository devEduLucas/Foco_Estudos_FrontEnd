import axios from 'axios';

export function isRequisicaoCancelada(erro: unknown): boolean {
  return axios.isCancel(erro);
}

export function mensagemDeErro(erro: unknown): string {
  if (axios.isAxiosError(erro) && !erro.response) {
    return 'Não foi possível conectar à API. Verifique se o servidor está em execução.';
  }
  return 'Não foi possível carregar os dados.';
}

export function statusDoErro(erro: unknown): number | undefined {
  return axios.isAxiosError(erro) ? erro.response?.status : undefined;
}
