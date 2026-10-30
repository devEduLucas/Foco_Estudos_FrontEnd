import { ChevronRight } from 'lucide-react';
import type { EstadoRequisicao } from '../../hooks/useRequisicao';
import { DIAS_PROXIMOS_PRAZOS } from '../../services/tarefaService';
import type { Tarefa } from '../../types/tarefa';
import { formatarDiaRelativo, interpretarPrazo, mesAbreviado } from '../../utils/datas';
import { LinkTexto } from '../ui/LinkTexto';
import { Painel } from '../ui/Painel';
import { ResultadoRequisicao } from '../ui/ResultadoRequisicao';
import estilos from './ProximosPrazos.module.css';

interface ProximosPrazosProps {
  estado: EstadoRequisicao<Tarefa[]>;
  aoTentarNovamente: () => void;
}

export function ProximosPrazos({ estado, aoTentarNovamente }: ProximosPrazosProps) {
  return (
    <Painel titulo="Próximos prazos" subtitulo={`Próximos ${DIAS_PROXIMOS_PRAZOS} dias`}>
      <ResultadoRequisicao estado={estado} aoTentarNovamente={aoTentarNovamente}>
        {(tarefas) =>
          tarefas.length === 0 ? (
            <p className={estilos.vazio}>Nenhum prazo nos próximos {DIAS_PROXIMOS_PRAZOS} dias.</p>
          ) : (
            <ul className={estilos.lista}>
              {tarefas.map((tarefa) => {
                const { data } = interpretarPrazo(tarefa.dataPrazo);
                return (
                  <li key={tarefa.id} className={estilos.item}>
                    <time className={estilos.data} dateTime={tarefa.dataPrazo}>
                      <span className={estilos.dia}>{data.getDate()}</span>
                      <span className={estilos.mes}>{mesAbreviado(data)}</span>
                    </time>
                    <div className={estilos.texto}>
                      <p className={estilos.titulo}>{tarefa.titulo}</p>
                      <p className={estilos.meta}>
                        {tarefa.materia.nome} · {formatarDiaRelativo(data)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        }
      </ResultadoRequisicao>

      <div className={estilos.rodape}>
        <LinkTexto to="/calendario">
          Abrir calendário
          <ChevronRight size={14} strokeWidth={1.75} aria-hidden="true" />
        </LinkTexto>
      </div>
    </Painel>
  );
}
