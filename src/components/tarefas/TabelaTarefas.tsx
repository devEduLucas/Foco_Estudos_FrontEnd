import type { Tarefa } from '../../types/tarefa';
import { OPCOES_PRIORIDADE, OPCOES_STATUS, rotuloDaOpcao } from '../../utils/opcoes';
import { estaAtrasada, formatarPrazo, statusExibido } from '../../utils/tarefas';
import { MenuAcoes } from '../ui/MenuAcoes';
import estilos from './TabelaTarefas.module.css';

interface TabelaTarefasProps {
  tarefas: Tarefa[];
  aoAlternarConclusao: (tarefa: Tarefa) => void;
  aoEditar: (tarefa: Tarefa) => void;
  aoExcluir: (tarefa: Tarefa) => void;
}

export function TabelaTarefas({ tarefas, aoAlternarConclusao, aoEditar, aoExcluir }: TabelaTarefasProps) {
  const agora = new Date();

  return (
    <div role="table" aria-label="Tarefas" className={estilos.tabela}>
      <div role="rowgroup">
        <div role="row" className={`${estilos.linha} ${estilos.cabecalho}`}>
          <div role="columnheader">Tarefa</div>
          <div role="columnheader">Matéria</div>
          <div role="columnheader">Prazo</div>
          <div role="columnheader">Prioridade</div>
          <div role="columnheader">Status</div>
          <div role="columnheader" className="sr-only">
            Ações
          </div>
        </div>
      </div>

      <div role="rowgroup">
        {tarefas.map((tarefa) => {
          const concluida = tarefa.status === 'CONCLUIDA';
          const atrasada = estaAtrasada(tarefa, agora);
          const status = statusExibido(tarefa, agora);
          const rotuloStatus =
            status === 'ATRASADA' ? 'Atrasada' : rotuloDaOpcao(OPCOES_STATUS, status);

          return (
            <div key={tarefa.id} role="row" className={`${estilos.linha} ${estilos.corpo}`}>
              <div role="cell" className={`${estilos.tarefa} ${estilos.celulaTarefa}`}>
                <input
                  type="checkbox"
                  className={estilos.caixa}
                  checked={concluida}
                  onChange={() => aoAlternarConclusao(tarefa)}
                  aria-label={`Concluir “${tarefa.titulo}”`}
                />
                <p className={concluida ? `${estilos.titulo} ${estilos.concluida}` : estilos.titulo}>
                  {tarefa.titulo}
                </p>
              </div>

              <div
                role="cell"
                className={`${estilos.materia} ${estilos.celulaMateria}`}
                data-rotulo="Matéria"
              >
                {tarefa.materia.nome}
              </div>

              <div
                role="cell"
                className={`${estilos.prazo} ${atrasada ? estilos.prazoAtrasado : ''} ${estilos.celulaPrazo}`}
                data-rotulo="Prazo"
              >
                {formatarPrazo(tarefa, agora)}
              </div>

              <div
                role="cell"
                className={`${tarefa.prioridade === 'ALTA' ? estilos.prioridadeAlta : estilos.prioridade} ${estilos.celulaPrioridade}`}
                data-rotulo="Prioridade"
              >
                {rotuloDaOpcao(OPCOES_PRIORIDADE, tarefa.prioridade)}
              </div>

              <div role="cell" className={estilos.celulaStatus}>
                <span className={`${estilos.status} ${estilos[`status${status}`]}`}>
                  <span className={estilos.ponto} aria-hidden="true" />
                  {rotuloStatus}
                </span>
              </div>

              <div role="cell" className={`${estilos.acoes} ${estilos.celulaAcoes}`}>
                <MenuAcoes
                  rotulo={`Ações de ${tarefa.titulo}`}
                  itens={[
                    { rotulo: 'Editar', aoSelecionar: () => aoEditar(tarefa) },
                    { rotulo: 'Excluir', perigo: true, aoSelecionar: () => aoExcluir(tarefa) },
                  ]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
