import type { CSSProperties, ReactNode } from 'react';
import { useRevelar } from '../../hooks/useRevelar';
import estilos from './Revelar.module.css';

interface RevelarProps {
  /** Atraso da entrada em ms, para escalonar itens de um mesmo grupo. */
  atraso?: number;
  className?: string;
  children: ReactNode;
}

/** Revela o conteúdo (opacity + transform) quando ele entra na tela durante a rolagem. */
export function Revelar({ atraso = 0, className, children }: RevelarProps) {
  const { ref, visivel } = useRevelar<HTMLDivElement>();
  const classes = [estilos.revelar, visivel ? estilos.visivel : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} style={{ '--atraso': `${atraso}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
