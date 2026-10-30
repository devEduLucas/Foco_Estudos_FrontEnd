import { api } from './api';
import type { FiltrosTarefas, StatusTarefa, Tarefa, TarefaRequest } from '../types/tarefa';

export const DIAS_PROXIMOS_PRAZOS = 7;

/** O filtro "Atrasada" vira `atrasada=true`; os demais valores de status seguem como `status`. */
function paraParametros({ status, prioridade, materiaId, prazo }: FiltrosTarefas) {
  return {
    status: status && status !== 'ATRASADA' ? status : undefined,
    atrasada: status === 'ATRASADA' ? true : undefined,
    prioridade,
    materiaId,
    prazo,
  };
}

export const tarefaService = {
  listar: (filtros: FiltrosTarefas = {}, signal?: AbortSignal) =>
    api
      .get<Tarefa[]>('/tarefas', { params: paraParametros(filtros), signal })
      .then((resposta) => resposta.data),

  criar: (dados: TarefaRequest) =>
    api.post<Tarefa>('/tarefas', dados).then((resposta) => resposta.data),

  listarHoje: (signal?: AbortSignal) =>
    api.get<Tarefa[]>('/tarefas/hoje', { signal }).then((resposta) => resposta.data),

  listarProximosPrazos: (signal?: AbortSignal) =>
    api
      .get<Tarefa[]>('/tarefas/proximos-prazos', {
        params: { dias: DIAS_PROXIMOS_PRAZOS },
        signal,
      })
      .then((resposta) => resposta.data),

  atualizar: (id: number, dados: TarefaRequest) =>
    api.put<Tarefa>(`/tarefas/${id}`, dados).then((resposta) => resposta.data),

  excluir: (id: number) => api.delete(`/tarefas/${id}`).then(() => undefined),

  atualizarStatus: (id: number, status: StatusTarefa) =>
    api.patch<Tarefa>(`/tarefas/${id}/status`, { status }).then((resposta) => resposta.data),
};
