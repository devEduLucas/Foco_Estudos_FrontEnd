import { useId } from 'react';
import type { Tarefa } from '../../types/tarefa';
import type { Compromisso } from '../../utils/calendario';
import { formatarHorario, mesAbreviado } from '../../utils/datas';
import estilos from './ProximosCompromissos.module.css';

interface ProximosCompromissosProps {
  compromissos: Compromisso[];
  subtitulo: string;
  aoSelecionar: (tarefa: Tarefa) => void;
}

export function ProximosCompromissos({
  compromissos,
  subtitulo,
  aoSelecionar,
}: ProximosCompromissosProps) {
  const idTitulo = useId();

  return (
    <section className={estilos.lateral} aria-labelledby={idTitulo}>
      <div className={estilos.painel}>
        <header className={estilos.cabecalho}>
          <h2 id={idTitulo} className={estilos.titulo}>
            Próximos compromissos
          </h2>
          <p className={estilos.subtitulo}>{subtitulo}</p>
        </header>

        {compromissos.length === 0 ? (
          <p className={estilos.vazio}>Nenhum compromisso neste mês.</p>
        ) : (
          <ul className={estilos.lista}>
            {compromissos.map(({ tarefa, data, temHorario }) => (
              <li key={tarefa.id} className={estilos.linha}>
                <button
                  type="button"
                  className={estilos.item}
                  onClick={() => aoSelecionar(tarefa)}
                  aria-label={`Editar “${tarefa.titulo}”`}
                >
                  <time className={estilos.data} dateTime={tarefa.dataPrazo}>
                    <span className={estilos.dia}>{String(data.getDate()).padStart(2, '0')}</span>
                    <span className={estilos.mes}>{mesAbreviado(data)}</span>
                  </time>
                  <span className={estilos.texto}>
                    <span
                      className={
                        tarefa.status === 'CONCLUIDA'
                          ? `${estilos.nome} ${estilos.concluida}`
                          : estilos.nome
                      }
                    >
                      {tarefa.titulo}
                    </span>
                    <span className={estilos.meta}>{tarefa.materia.nome}</span>
                    {temHorario && <span className={estilos.meta}>{formatarHorario(data)}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
