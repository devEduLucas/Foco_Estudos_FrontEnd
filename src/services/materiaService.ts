import { api } from './api';
import type { Materia, MateriaRequest } from '../types/materia';

export const materiaService = {
  listar: (signal?: AbortSignal) =>
    api.get<Materia[]>('/materias', { signal }).then((resposta) => resposta.data),

  criar: (dados: MateriaRequest) =>
    api.post<Materia>('/materias', dados).then((resposta) => resposta.data),

  atualizar: (id: number, dados: MateriaRequest) =>
    api.put<Materia>(`/materias/${id}`, dados).then((resposta) => resposta.data),

  excluir: (id: number) => api.delete(`/materias/${id}`).then(() => undefined),
};
