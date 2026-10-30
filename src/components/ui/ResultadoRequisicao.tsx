import type { ReactNode } from 'react';
import type { EstadoRequisicao } from '../../hooks/useRequisicao';
import estilos from './ResultadoRequisicao.module.css';

interface ResultadoRequisicaoProps<T> {
  estado: EstadoRequisicao<T>;
  aoTentarNovamente: () => void;
  children: (dados: T) => ReactNode;
}

export function ResultadoRequisicao<T>({
  estado,
  aoTentarNovamente,
  children,
}: ResultadoRequisicaoProps<T>) {
  if (estado.status === 'carregando') {
    return (
      <p className={estilos.mensagem} role="status">
        Carregando...
      </p>
    );
  }

  if (estado.status === 'erro') {
    return (
      <div className={estilos.mensagem} role="alert">
        <p>{estado.mensagem}</p>
        <button type="button" className={estilos.tentar} onClick={aoTentarNovamente}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return <>{children(estado.dados)}</>;
}
