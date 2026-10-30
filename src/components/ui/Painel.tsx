import { useId, type ReactNode } from 'react';
import estilos from './Painel.module.css';

interface PainelProps {
  titulo: string;
  subtitulo?: string;
  acao?: ReactNode;
  /** Linha divisória entre o cabeçalho e o conteúdo. */
  separado?: boolean;
  children: ReactNode;
}

export function Painel({ titulo, subtitulo, acao, separado = false, children }: PainelProps) {
  const idTitulo = useId();

  return (
    <section className={estilos.painel} aria-labelledby={idTitulo}>
      <header className={separado ? `${estilos.cabecalho} ${estilos.separado}` : estilos.cabecalho}>
        <div>
          <h2 id={idTitulo} className={estilos.titulo}>
            {titulo}
          </h2>
          {subtitulo && <p className={estilos.subtitulo}>{subtitulo}</p>}
        </div>
        {acao}
      </header>
      {children}
    </section>
  );
}
