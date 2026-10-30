import type { EstadoRequisicao } from '../../hooks/useRequisicao';
import type { ResumoTarefas } from '../../types/resumo';
import { ResultadoRequisicao } from '../ui/ResultadoRequisicao';
import estilos from './IndicadoresResumo.module.css';

interface IndicadoresResumoProps {
  estado: EstadoRequisicao<ResumoTarefas>;
  aoTentarNovamente: () => void;
}

const indicadores: { chave: keyof ResumoTarefas; rotulo: string }[] = [
  { chave: 'pendentes', rotulo: 'Tarefas pendentes' },
  { chave: 'emAndamento', rotulo: 'Em andamento' },
  { chave: 'concluidas', rotulo: 'Concluídas' },
  { chave: 'atrasadas', rotulo: 'Atrasadas' },
];

export function IndicadoresResumo({ estado, aoTentarNovamente }: IndicadoresResumoProps) {
  return (
    <section className={estilos.caixa} aria-label="Resumo das tarefas">
      <ResultadoRequisicao estado={estado} aoTentarNovamente={aoTentarNovamente}>
        {(resumo) => (
          <ul className={estilos.grade}>
            {indicadores.map(({ chave, rotulo }) => {
              const valor = resumo[chave];
              const destacar = chave === 'atrasadas' && valor > 0;
              return (
                <li key={chave} className={estilos.item}>
                  <p className={destacar ? `${estilos.valor} ${estilos.perigo}` : estilos.valor}>
                    {String(valor).padStart(2, '0')}
                  </p>
                  <p className={estilos.rotulo}>{rotulo}</p>
                </li>
              );
            })}
          </ul>
        )}
      </ResultadoRequisicao>
    </section>
  );
}
