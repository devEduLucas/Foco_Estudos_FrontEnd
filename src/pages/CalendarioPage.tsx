import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CalendarioMensal } from '../components/calendario/CalendarioMensal';
import { ProximosCompromissos } from '../components/calendario/ProximosCompromissos';
import { TarefaPainel } from '../components/tarefas/TarefaPainel';
import { Botao } from '../components/ui/Botao';
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina';
import { ResultadoRequisicao } from '../components/ui/ResultadoRequisicao';
import { useRequisicao } from '../hooks/useRequisicao';
import { tarefaService } from '../services/tarefaService';
import type { Tarefa } from '../types/tarefa';
import { compromissosDoMes, mesmoMes } from '../utils/calendario';
import { capitalizarPalavras, formatarDataExtenso } from '../utils/datas';
import estilos from './CalendarioPage.module.css';

// A API não filtra por intervalo de datas: busca todas as tarefas e agrupa por mês no cliente.
const listarTodas = (signal: AbortSignal) => tarefaService.listar({}, signal);

function inicioDoMes(data: Date): Date {
  return new Date(data.getFullYear(), data.getMonth(), 1);
}

export function CalendarioPage() {
  const { estado, recarregar, atualizar } = useRequisicao(listarTodas);
  const [mes, setMes] = useState(() => inicioDoMes(new Date()));
  /** null: fechado. Objeto vazio: nova tarefa. Com `tarefa`: edição. */
  const [painel, setPainel] = useState<{ tarefa?: Tarefa } | null>(null);

  const agora = new Date();
  const subtitulo = mesmoMes(mes, agora)
    ? 'Agenda deste mês'
    : `Agenda de ${mes.toLocaleDateString('pt-BR', { month: 'long' })}`;

  function mudarMes(delta: -1 | 1) {
    setMes((atual) => new Date(atual.getFullYear(), atual.getMonth() + delta, 1));
  }

  function aoSalvar() {
    setPainel(null);
    atualizar();
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Calendário"
        subtitulo={capitalizarPalavras(formatarDataExtenso(agora))}
        acao={
          <Botao onClick={() => setPainel({})}>
            <Plus size={15} strokeWidth={2} aria-hidden="true" />
            Nova tarefa
          </Botao>
        }
      />

      <ResultadoRequisicao estado={estado} aoTentarNovamente={recarregar}>
        {(tarefas) => {
          const compromissos = compromissosDoMes(tarefas, mes);

          return (
            <div className={estilos.grade}>
              <CalendarioMensal
                mes={mes}
                compromissos={compromissos}
                agora={agora}
                aoMudarMes={mudarMes}
                aoIrParaHoje={() => setMes(inicioDoMes(new Date()))}
                aoSelecionar={(tarefa) => setPainel({ tarefa })}
              />
              <ProximosCompromissos
                compromissos={compromissos}
                subtitulo={subtitulo}
                aoSelecionar={(tarefa) => setPainel({ tarefa })}
              />
            </div>
          );
        }}
      </ResultadoRequisicao>

      {painel && (
        <TarefaPainel tarefa={painel.tarefa} aoFechar={() => setPainel(null)} aoSalvar={aoSalvar} />
      )}
    </>
  );
}
