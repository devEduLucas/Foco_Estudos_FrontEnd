export interface Materia {
  id: number;
  nome: string;
  descricao: string | null;
  totalTarefas: number;
  /** Tarefas com status PENDENTE. */
  tarefasPendentes: number;
}

export interface MateriaRequest {
  nome: string;
  descricao: string | null;
}
