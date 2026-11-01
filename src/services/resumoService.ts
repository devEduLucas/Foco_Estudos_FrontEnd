import { api } from './api';
import type { ResumoSemanal, ResumoTarefas } from '../types/resumo';

export const resumoService = {
  obterResumo: (signal?: AbortSignal) =>
    api.get<ResumoTarefas>('/resumo', { signal }).then((resposta) => resposta.data),

  obterResumoSemanal: (signal?: AbortSignal) =>
    api
      .get<{ total: number; concluidas: number }>('/resumo/semanal', { signal })
      .then(({ data }): ResumoSemanal => ({ planejadas: data.total, concluidas: data.concluidas })),
};
