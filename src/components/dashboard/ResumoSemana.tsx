import { useId } from 'react';
import type { EstadoRequisicao } from '../../hooks/useRequisicao';
import type { ResumoSemanal } from '../../types/resumo';
import { ResultadoRequisicao } from '../ui/ResultadoRequisicao';
import estilos from './ResumoSemana.module.css';

interface ResumoSemanaProps {
  estado: EstadoRequisicao<ResumoSemanal>;
  aoTentarNovamente: () => void;
}

function descrever({ concluidas, planejadas }: ResumoSemanal): string {
  if (planejadas === 0) return 'Nenhuma tarefa planejada para esta semana';
  return `Você concluiu ${concluidas} de ${planejadas} tarefas planejadas`;
}

export function ResumoSemana({ estado, aoTentarNovamente }: ResumoSemanaProps) {
  const idTitulo = useId();
  const idProgresso = useId();

  return (
    <section className={estilos.resumo} aria-labelledby={idTitulo}>
      <ResultadoRequisicao estado={estado} aoTentarNovamente={aoTentarNovamente}>
        {(resumo) => {
          const percentual =
            resumo.planejadas === 0 ? 0 : Math.round((resumo.concluidas / resumo.planejadas) * 100);

          return (
            <div className={estilos.conteudo}>
              <div>
                <h2 id={idTitulo} className={estilos.titulo}>
                  Resumo da semana
                </h2>
                <p className={estilos.descricao}>{descrever(resumo)}</p>
              </div>

              <div>
                <div className={estilos.topo}>
                  <span id={idProgresso} className={estilos.rotulo}>
                    Progresso semanal
                  </span>
                  <span className={estilos.percentual}>{percentual}%</span>
                </div>
                <div
                  className={estilos.trilho}
                  role="progressbar"
                  aria-labelledby={idProgresso}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentual}
                >
                  <div className={estilos.barra} style={{ width: `${percentual}%` }} />
                </div>
              </div>
            </div>
          );
        }}
      </ResultadoRequisicao>
    </section>
  );
}
