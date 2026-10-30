import type { Tarefa } from '../types/tarefa';
import { interpretarPrazo } from './datas';
import { estaAtrasada } from './tarefas';

export interface Compromisso {
  tarefa: Tarefa;
  data: Date;
  temHorario: boolean;
}

export type TomCompromisso = 'atrasado' | 'concluido' | 'alta' | 'padrao';

export function chaveDoDia(data: Date): string {
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function mesmoMes(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Tarefas com prazo dentro do mês, ordenadas por data e horário. */
export function compromissosDoMes(tarefas: Tarefa[], mes: Date): Compromisso[] {
  return tarefas
    .map((tarefa) => ({ tarefa, ...interpretarPrazo(tarefa.dataPrazo) }))
    .filter(({ data }) => mesmoMes(data, mes))
    .sort((a, b) => a.data.getTime() - b.data.getTime());
}

export function agruparPorDia(compromissos: Compromisso[]): Map<string, Compromisso[]> {
  const grupos = new Map<string, Compromisso[]>();
  for (const compromisso of compromissos) {
    const chave = chaveDoDia(compromisso.data);
    grupos.set(chave, [...(grupos.get(chave) ?? []), compromisso]);
  }
  return grupos;
}

/** Semanas do mês (domingo a sábado). `null` marca os dias fora do mês. */
export function semanasDoMes(mes: Date): (Date | null)[][] {
  const ano = mes.getFullYear();
  const indice = mes.getMonth();
  const diasNoMes = new Date(ano, indice + 1, 0).getDate();

  const celulas: (Date | null)[] = [
    ...Array<null>(new Date(ano, indice, 1).getDay()).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => new Date(ano, indice, i + 1)),
  ];
  while (celulas.length % 7 !== 0) celulas.push(null);

  const semanas: (Date | null)[][] = [];
  for (let i = 0; i < celulas.length; i += 7) semanas.push(celulas.slice(i, i + 7));
  return semanas;
}

export function tomDoCompromisso(tarefa: Tarefa, agora: Date): TomCompromisso {
  if (tarefa.status === 'CONCLUIDA') return 'concluido';
  if (estaAtrasada(tarefa, agora)) return 'atrasado';
  if (tarefa.prioridade === 'ALTA') return 'alta';
  return 'padrao';
}
