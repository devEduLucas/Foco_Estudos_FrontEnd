import type { ReactNode } from 'react';
import estilos from './CabecalhoPagina.module.css';

interface CabecalhoPaginaProps {
  titulo: string;
  subtitulo?: string;
  acao?: ReactNode;
}

export function CabecalhoPagina({ titulo, subtitulo, acao }: CabecalhoPaginaProps) {
  return (
    <header className={estilos.cabecalho}>
      <div>
        <h1 className={estilos.titulo}>{titulo}</h1>
        {subtitulo && <p className={estilos.subtitulo}>{subtitulo}</p>}
      </div>
      {acao}
    </header>
  );
}
