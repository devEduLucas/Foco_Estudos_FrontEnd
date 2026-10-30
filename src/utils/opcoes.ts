import type { FiltroPrazo, FiltroStatus, PrioridadeTarefa, StatusTarefa } from '../types/tarefa';

export const OPCOES_PRIORIDADE: { valor: PrioridadeTarefa; rotulo: string }[] = [
  { valor: 'BAIXA', rotulo: 'Baixa' },
  { valor: 'MEDIA', rotulo: 'Média' },
  { valor: 'ALTA', rotulo: 'Alta' },
];

export const OPCOES_STATUS: { valor: StatusTarefa; rotulo: string }[] = [
  { valor: 'PENDENTE', rotulo: 'Pendente' },
  { valor: 'EM_ANDAMENTO', rotulo: 'Em andamento' },
  { valor: 'CONCLUIDA', rotulo: 'Concluída' },
];

export const OPCOES_FILTRO_STATUS: { valor: FiltroStatus; rotulo: string }[] = [
  ...OPCOES_STATUS,
  { valor: 'ATRASADA', rotulo: 'Atrasada' },
];

export const OPCOES_FILTRO_PRAZO: { valor: FiltroPrazo; rotulo: string }[] = [
  { valor: 'HOJE', rotulo: 'Hoje' },
  { valor: 'PROXIMOS_7_DIAS', rotulo: 'Próximos 7 dias' },
  { valor: 'ESTE_MES', rotulo: 'Este mês' },
];

export function rotuloDaOpcao<T extends string>(
  opcoes: { valor: T; rotulo: string }[],
  valor: T,
): string {
  return opcoes.find((opcao) => opcao.valor === valor)?.rotulo ?? valor;
}
