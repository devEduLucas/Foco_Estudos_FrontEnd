import { api } from './api';
import type { FiltrosTarefas, StatusTarefa, Tarefa, TarefaRequest } from '../types/tarefa';
import { diferencaEmDias, interpretarPrazo } from '../utils/datas';
import { estaAtrasada } from '../utils/tarefas';

export const DIAS_PROXIMOS_PRAZOS = 7;

/** Formato devolvido pela API: só o id da matéria, sem filtros de prazo/prioridade/atraso. */
type TarefaApi = Omit<Tarefa, 'materia'> & { materiaId: number };

async function carregarTodas(signal?: AbortSignal): Promise<Tarefa[]> {
  const [tarefas, materias] = await Promise.all([
    api.get<TarefaApi[]>('/tarefas', { signal }),
    api.get<{ id: number; nome: string }[]>('/materias', { signal }),
  ]);
  const nomes = new Map(materias.data.map((materia) => [materia.id, materia.nome]));

  return tarefas.data
    .map(({ materiaId, ...tarefa }) => ({
      ...tarefa,
      materia: { id: materiaId, nome: nomes.get(materiaId) ?? 'Sem matéria' },
    }))
    .sort((a, b) => a.dataPrazo.localeCompare(b.dataPrazo));
}

/** Diferença em dias entre o prazo e hoje (negativa quando já passou). */
function diasAteOPrazo(tarefa: Tarefa, agora: Date): number {
  return diferencaEmDias(interpretarPrazo(tarefa.dataPrazo).data, agora);
}

function filtrar(tarefas: Tarefa[], { status, prioridade, materiaId, prazo }: FiltrosTarefas) {
  const agora = new Date();

  return tarefas.filter((tarefa) => {
    if (status === 'ATRASADA' && !estaAtrasada(tarefa, agora)) return false;
    if (status && status !== 'ATRASADA' && tarefa.status !== status) return false;
    if (prioridade && tarefa.prioridade !== prioridade) return false;
    if (materiaId && tarefa.materia.id !== materiaId) return false;

    if (prazo) {
      const dias = diasAteOPrazo(tarefa, agora);
      const { data } = interpretarPrazo(tarefa.dataPrazo);
      if (prazo === 'HOJE' && dias !== 0) return false;
      if (prazo === 'PROXIMOS_7_DIAS' && (dias < 0 || dias > 7)) return false;
      if (
        prazo === 'ESTE_MES' &&
        (data.getFullYear() !== agora.getFullYear() || data.getMonth() !== agora.getMonth())
      ) {
        return false;
      }
    }
    return true;
  });
}

export const tarefaService = {
  listar: (filtros: FiltrosTarefas = {}, signal?: AbortSignal) =>
    carregarTodas(signal).then((tarefas) => filtrar(tarefas, filtros)),

  criar: (dados: TarefaRequest) => api.post('/tarefas', dados).then(() => undefined),

  listarHoje: (signal?: AbortSignal) =>
    carregarTodas(signal).then((tarefas) => filtrar(tarefas, { prazo: 'HOJE' })),

  listarProximosPrazos: (signal?: AbortSignal) =>
    carregarTodas(signal).then((tarefas) => {
      const agora = new Date();
      return tarefas.filter((tarefa) => {
        const dias = diasAteOPrazo(tarefa, agora);
        return tarefa.status !== 'CONCLUIDA' && dias >= 0 && dias <= DIAS_PROXIMOS_PRAZOS;
      });
    }),

  atualizar: (id: number, dados: TarefaRequest) =>
    api.put(`/tarefas/${id}`, dados).then(() => undefined),

  excluir: (id: number) => api.delete(`/tarefas/${id}`).then(() => undefined),

  atualizarStatus: (id: number, status: StatusTarefa) =>
    api.patch(`/tarefas/${id}/status`, { status }).then(() => undefined),
};
