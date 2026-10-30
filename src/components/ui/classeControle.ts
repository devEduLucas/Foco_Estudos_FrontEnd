import controles from './controles.module.css';

export function classeControle(invalido = false, ...extras: string[]): string {
  return [controles.controle, invalido ? controles.invalido : '', ...extras]
    .filter(Boolean)
    .join(' ');
}
