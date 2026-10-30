const MS_POR_DIA = 86_400_000;
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export interface PrazoInterpretado {
  data: Date;
  temHorario: boolean;
}

/** Interpreta datas ISO sem deslocar o dia por fuso horário. */
export function interpretarPrazo(iso: string): PrazoInterpretado {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const ano = Number(iso.slice(0, 4));
    const mes = Number(iso.slice(5, 7));
    const dia = Number(iso.slice(8, 10));
    return { data: new Date(ano, mes - 1, dia), temHorario: false };
  }
  return { data: new Date(iso), temHorario: true };
}

export function diferencaEmDias(data: Date, referencia: Date = new Date()): number {
  const inicioData = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  const inicioReferencia = new Date(
    referencia.getFullYear(),
    referencia.getMonth(),
    referencia.getDate(),
  );
  return Math.round((inicioData.getTime() - inicioReferencia.getTime()) / MS_POR_DIA);
}

export function formatarDiaRelativo(data: Date, referencia: Date = new Date()): string {
  const diferenca = diferencaEmDias(data, referencia);
  if (diferenca === 0) return 'Hoje';
  if (diferenca === 1) return 'Amanhã';
  if (diferenca === -1) return 'Ontem';
  if (diferenca > 1 && diferenca < 7) {
    return data.toLocaleDateString('pt-BR', { weekday: 'long' });
  }
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export function formatarHorario(data: Date): string {
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function formatarDataExtenso(data: Date): string {
  return data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function mesAbreviado(data: Date): string {
  return MESES[data.getMonth()];
}

export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function capitalizarPalavras(texto: string): string {
  return texto.replace(/(^|[\s-])(\p{L})/gu, (_, separador: string, letra: string) =>
    separador + letra.toUpperCase(),
  );
}
