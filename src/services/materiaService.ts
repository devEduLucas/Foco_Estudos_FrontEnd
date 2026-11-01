import { api } from './api';
import type { Materia, MateriaRequest } from '../types/materia';

type MateriaApi = Pick<Materia, 'id' | 'nome' | 'descricao'>;

export const materiaService = {
  /** A API não devolve contagens: elas são calculadas a partir das tarefas. */
  listar: async (signal?: AbortSignal): Promise<Materia[]> => {
    const [materias, tarefas] = await Promise.all([
      api.get<MateriaApi[]>('/materias', { signal }),
      api.get<{ materiaId: number; status: string }[]>('/tarefas', { signal }),
    ]);

    return materias.data.map((materia) => {
      const dela = tarefas.data.filter((tarefa) => tarefa.materiaId === materia.id);
      return {
        ...materia,
        totalTarefas: dela.length,
        tarefasPendentes: dela.filter((tarefa) => tarefa.status === 'PENDENTE').length,
      };
    });
  },

  criar: (dados: MateriaRequest) => api.post('/materias', dados).then(() => undefined),

  atualizar: (id: number, dados: MateriaRequest) =>
    api.put(`/materias/${id}`, dados).then(() => undefined),

  excluir: (id: number) => api.delete(`/materias/${id}`).then(() => undefined),
};
