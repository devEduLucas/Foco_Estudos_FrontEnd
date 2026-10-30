import type { ButtonHTMLAttributes } from 'react';
import estilos from './Botao.module.css';

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario' | 'perigo';
}

export function Botao({ variante = 'primario', type = 'button', className, ...props }: BotaoProps) {
  const classes = [estilos.botao, estilos[variante], className].filter(Boolean).join(' ');
  return <button type={type} className={classes} {...props} />;
}
