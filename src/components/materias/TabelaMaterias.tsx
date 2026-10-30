import { Link } from 'react-router-dom';
import type { Materia } from '../../types/materia';
import { iniciaisDaMateria } from '../../utils/materias';
import { MenuAcoes } from '../ui/MenuAcoes';
import estilos from './TabelaMaterias.module.css';

interface TabelaMateriasProps {
  materias: Materia[];
  aoEditar: (materia: Materia) => void;
  aoExcluir: (materia: Materia) => void;
}

export function TabelaMaterias({ materias, aoEditar, aoExcluir }: TabelaMateriasProps) {
  return (
    <div role="table" aria-label="Matérias" className={estilos.tabela}>
      <div role="rowgroup">
        <div role="row" className={`${estilos.linha} ${estilos.cabecalho}`}>
          <div role="columnheader">Matéria</div>
          <div role="columnheader">Tarefas</div>
          <div role="columnheader">Pendentes</div>
          <div role="columnheader">Ações</div>
        </div>
      </div>

      <div role="rowgroup">
        {materias.map((materia) => (
          <div key={materia.id} role="row" className={`${estilos.linha} ${estilos.corpo}`}>
            <div role="cell" className={estilos.materia}>
              <span className={estilos.avatar} aria-hidden="true">
                {iniciaisDaMateria(materia.nome)}
              </span>
              <div className={estilos.textos}>
                <p className={estilos.nome}>{materia.nome}</p>
                {materia.descricao && <p className={estilos.descricao}>{materia.descricao}</p>}
              </div>
            </div>

            <div role="cell" className={`${estilos.numero} ${estilos.celulaTarefas}`} data-rotulo="Tarefas">
              {materia.totalTarefas}
            </div>

            <div
              role="cell"
              className={`${estilos.numero} ${estilos.celulaPendentes}`}
              data-rotulo="Pendentes"
            >
              {materia.tarefasPendentes}
            </div>

            <div role="cell" className={estilos.acoes}>
              <Link
                to={`/tarefas?materiaId=${materia.id}`}
                className={estilos.visualizar}
                aria-label={`Visualizar tarefas de ${materia.nome}`}
              >
                Visualizar
              </Link>
              <MenuAcoes
                rotulo={`Ações de ${materia.nome}`}
                itens={[
                  { rotulo: 'Editar', aoSelecionar: () => aoEditar(materia) },
                  { rotulo: 'Excluir', perigo: true, aoSelecionar: () => aoExcluir(materia) },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
