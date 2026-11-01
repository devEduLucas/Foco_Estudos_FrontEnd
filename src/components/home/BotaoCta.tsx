import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import estilos from './BotaoCta.module.css';

interface BotaoCtaProps {
  to: string;
  variante?: 'primario' | 'secundario';
  tamanho?: 'md' | 'lg';
  seta?: boolean;
  children: ReactNode;
}

export function BotaoCta({ to, variante = 'primario', tamanho = 'md', seta = false, children }: BotaoCtaProps) {
  return (
    <Link to={to} className={`${estilos.botao} ${estilos[variante]} ${estilos[tamanho]}`}>
      {children}
      {seta && <ArrowRight className={estilos.seta} size={16} strokeWidth={2} aria-hidden="true" />}
    </Link>
  );
}
