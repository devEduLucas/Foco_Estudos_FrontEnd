import type { Materia } from './materia';

export type StatusTarefa = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
export type PrioridadeTarefa = 'BAIXA' | 'MEDIA' | 'ALTA';
/** ATRASADA não é um status persistido: é derivada do prazo (ver `estaAtrasada`). */
export type FiltroStatus = StatusTarefa | 'ATRASADA';
export type FiltroPrazo = 'HOJE' | 'PROXIMOS_7_DIAS' | 'ESTE_MES';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string | null;
  dataPrazo: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  materia: Pick<Materia, 'id' | 'nome'>;
}

export interface TarefaRequest {
  titulo: string;
  descricao: string | null;
  dataPrazo: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  materiaId: number;
}

export interface FiltrosTarefas {
  status?: FiltroStatus;
  prioridade?: PrioridadeTarefa;
  materiaId?: number;
  prazo?: FiltroPrazo;
}
