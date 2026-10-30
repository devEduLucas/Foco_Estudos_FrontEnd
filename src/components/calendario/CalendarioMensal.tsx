import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Tarefa } from '../../types/tarefa';
import {
  agruparPorDia,
  chaveDoDia,
  semanasDoMes,
  tomDoCompromisso,
  type Compromisso,
} from '../../utils/calendario';
import { capitalizar, diferencaEmDias } from '../../utils/datas';
import estilos from './CalendarioMensal.module.css';

const DIAS_SEMANA = [
  { abreviado: 'Dom', completo: 'Domingo' },
  { abreviado: 'Seg', completo: 'Segunda-feira' },
  { abreviado: 'Ter', completo: 'Terça-feira' },
  { abreviado: 'Qua', completo: 'Quarta-feira' },
  { abreviado: 'Qui', completo: 'Quinta-feira' },
  { abreviado: 'Sex', completo: 'Sexta-feira' },
  { abreviado: 'Sáb', completo: 'Sábado' },
];

const MAX_PONTOS = 3;

interface CalendarioMensalProps {
  mes: Date;
  compromissos: Compromisso[];
  agora: Date;
  aoMudarMes: (delta: -1 | 1) => void;
  aoIrParaHoje: () => void;
  aoSelecionar: (tarefa: Tarefa) => void;
}

export function CalendarioMensal({
  mes,
  compromissos,
  agora,
  aoMudarMes,
  aoIrParaHoje,
  aoSelecionar,
}: CalendarioMensalProps) {
  const titulo = capitalizar(mes.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }));
  const porDia = agruparPorDia(compromissos);

  return (
    <section className={estilos.cartao} aria-label="Calendário mensal">
      <header className={estilos.cabecalho}>
        <div className={estilos.grupoTitulo}>
          <h2 className={estilos.titulo} aria-live="polite">
            {titulo}
          </h2>
          <button type="button" className={estilos.hoje} onClick={aoIrParaHoje}>
            Hoje
          </button>
        </div>

        <div className={estilos.navegacao}>
          <button
            type="button"
            className={estilos.seta}
            onClick={() => aoMudarMes(-1)}
            aria-label="Mês anterior"
          >
            <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={estilos.seta}
            onClick={() => aoMudarMes(1)}
            aria-label="Próximo mês"
          >
            <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </header>

      <table className={estilos.tabela}>
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr>
            {DIAS_SEMANA.map(({ abreviado, completo }) => (
              <th key={abreviado} scope="col" className={estilos.diaSemana}>
                <span aria-hidden="true">{abreviado}</span>
                <span className="sr-only">{completo}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {semanasDoMes(mes).map((semana, indiceSemana) => (
            <tr key={indiceSemana}>
              {semana.map((dia, indiceDia) => {
                if (!dia) return <td key={indiceDia} className={estilos.fora} />;

                const doDia = porDia.get(chaveDoDia(dia)) ?? [];
                const hoje = diferencaEmDias(dia, agora) === 0;

                return (
                  <td key={indiceDia} className={estilos.dia}>
                    <span
                      className={hoje ? `${estilos.numero} ${estilos.numeroHoje}` : estilos.numero}
                      aria-current={hoje ? 'date' : undefined}
                    >
                      {dia.getDate()}
                    </span>

                    {doDia.length > 0 && (
                      <>
                        <ul className={estilos.compromissos}>
                          {doDia.map(({ tarefa }) => (
                            <li key={tarefa.id}>
                              <button
                                type="button"
                                className={`${estilos.compromisso} ${estilos[tomDoCompromisso(tarefa, agora)]}`}
                                title={`${tarefa.titulo} · ${tarefa.materia.nome}`}
                                aria-label={`Editar “${tarefa.titulo}”`}
                                onClick={() => aoSelecionar(tarefa)}
                              >
                                {tarefa.titulo}
                              </button>
                            </li>
                          ))}
                        </ul>

                        <span className={estilos.pontos} aria-hidden="true">
                          {doDia.slice(0, MAX_PONTOS).map(({ tarefa }) => (
                            <span
                              key={tarefa.id}
                              className={`${estilos.ponto} ${estilos[tomDoCompromisso(tarefa, agora)]}`}
                            />
                          ))}
                        </span>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
