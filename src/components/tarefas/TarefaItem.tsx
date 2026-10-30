import { Clock } from 'lucide-react';
import type { Tarefa } from '../../types/tarefa';
import {
  capitalizar,
  formatarDiaRelativo,
  formatarHorario,
  interpretarPrazo,
} from '../../utils/datas';
import { estaAtrasada } from '../../utils/tarefas';
import estilos from './TarefaItem.module.css';

interface TarefaItemProps {
  tarefa: Tarefa;
  aoAlternarConclusao: (tarefa: Tarefa) => void;
}

export function TarefaItem({ tarefa, aoAlternarConclusao }: TarefaItemProps) {
  const atrasada = estaAtrasada(tarefa);
  const concluida = tarefa.status === 'CONCLUIDA';
  const { data, temHorario } = interpretarPrazo(tarefa.dataPrazo);
  const prazo = [capitalizar(formatarDiaRelativo(data)), temHorario ? formatarHorario(data) : null]
    .filter(Boolean)
    .join(', ');

  return (
    <li className={atrasada ? `${estilos.item} ${estilos.atrasada}` : estilos.item}>
      <input
        type="checkbox"
        className={estilos.caixa}
        checked={concluida}
        onChange={() => aoAlternarConclusao(tarefa)}
        aria-label={tarefa.titulo}
      />

      <div className={estilos.texto}>
        <p className={concluida ? `${estilos.titulo} ${estilos.concluida}` : estilos.titulo}>
          {tarefa.titulo}
        </p>
        <p className={estilos.materia}>{tarefa.materia.nome}</p>
      </div>

      <div className={estilos.informacoes}>
        {tarefa.prioridade === 'ALTA' && (
          <span className={estilos.prioridadeAlta}>Prioridade alta</span>
        )}
        <span className={atrasada ? `${estilos.prazo} ${estilos.prazoAtrasado}` : estilos.prazo}>
          <Clock size={13} strokeWidth={1.75} aria-hidden="true" />
          {prazo}
        </span>
      </div>
    </li>
  );
}
