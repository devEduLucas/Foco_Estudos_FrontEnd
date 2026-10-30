import { Plus } from 'lucide-react';
import type { EstadoRequisicao } from '../../hooks/useRequisicao';
import type { Tarefa } from '../../types/tarefa';
import { TarefaItem } from '../tarefas/TarefaItem';
import { LinkTexto } from '../ui/LinkTexto';
import { Painel } from '../ui/Painel';
import { ResultadoRequisicao } from '../ui/ResultadoRequisicao';
import estilos from './TarefasHoje.module.css';

interface TarefasHojeProps {
  estado: EstadoRequisicao<Tarefa[]>;
  aoTentarNovamente: () => void;
  aoAlternarConclusao: (tarefa: Tarefa) => void;
  aoAdicionarTarefa: () => void;
}

function descreverQuantidade(quantidade: number): string {
  if (quantidade === 0) return 'Nenhuma atividade prevista para hoje';
  return quantidade === 1
    ? '1 atividade prevista para hoje'
    : `${quantidade} atividades previstas para hoje`;
}

export function TarefasHoje({
  estado,
  aoTentarNovamente,
  aoAlternarConclusao,
  aoAdicionarTarefa,
}: TarefasHojeProps) {
  const subtitulo = estado.status === 'sucesso' ? descreverQuantidade(estado.dados.length) : undefined;

  return (
    <Painel
      titulo="Tarefas de hoje"
      subtitulo={subtitulo}
      acao={<LinkTexto to="/tarefas">Ver todas</LinkTexto>}
      separado
    >
      <ResultadoRequisicao estado={estado} aoTentarNovamente={aoTentarNovamente}>
        {(tarefas) =>
          tarefas.length === 0 ? (
            <p className={estilos.vazio}>Nenhuma tarefa para hoje.</p>
          ) : (
            <ul>
              {tarefas.map((tarefa) => (
                <TarefaItem key={tarefa.id} tarefa={tarefa} aoAlternarConclusao={aoAlternarConclusao} />
              ))}
            </ul>
          )
        }
      </ResultadoRequisicao>

      <button type="button" className={estilos.adicionar} onClick={aoAdicionarTarefa}>
        <Plus size={14} strokeWidth={1.75} aria-hidden="true" />
        Adicionar tarefa
      </button>
    </Painel>
  );
}
