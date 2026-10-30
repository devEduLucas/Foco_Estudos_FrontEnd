import type { StatusTarefa, Tarefa } from '../types/tarefa';
import {
  capitalizar,
  diferencaEmDias,
  formatarDiaRelativo,
  formatarHorario,
  interpretarPrazo,
  mesAbreviado,
} from './datas';

export type StatusExibido = StatusTarefa | 'ATRASADA';

export function estaAtrasada(tarefa: Tarefa, agora: Date = new Date()): boolean {
  if (tarefa.status === 'CONCLUIDA') return false;
  const { data, temHorario } = interpretarPrazo(tarefa.dataPrazo);
  return temHorario ? data.getTime() < agora.getTime() : diferencaEmDias(data, agora) < 0;
}

/** Status mostrado ao usuário: tarefa não concluída com prazo vencido aparece como "Atrasada". */
export function statusExibido(tarefa: Tarefa, agora: Date = new Date()): StatusExibido {
  return estaAtrasada(tarefa, agora) ? 'ATRASADA' : tarefa.status;
}

/** "Hoje, 18:00", "Ontem, 19:00", "Quarta-feira, 09:00" ou "22 mai" (com ano se for outro ano). */
export function formatarPrazo(tarefa: Tarefa, agora: Date = new Date()): string {
  const { data, temHorario } = interpretarPrazo(tarefa.dataPrazo);
  const diferenca = diferencaEmDias(data, agora);

  let dia: string;
  if (diferenca >= -1 && diferenca < 7) {
    dia = capitalizar(formatarDiaRelativo(data, agora));
  } else {
    dia = `${data.getDate()} ${mesAbreviado(data)}`;
    if (data.getFullYear() !== agora.getFullYear()) dia += ` ${data.getFullYear()}`;
  }

  return temHorario ? `${dia}, ${formatarHorario(data)}` : dia;
}
