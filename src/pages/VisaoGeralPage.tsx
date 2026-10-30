import { useState } from 'react';
import { Plus } from 'lucide-react';
import { IndicadoresResumo } from '../components/dashboard/IndicadoresResumo';
import { ProximosPrazos } from '../components/dashboard/ProximosPrazos';
import { ResumoSemana } from '../components/dashboard/ResumoSemana';
import { TarefasHoje } from '../components/dashboard/TarefasHoje';
import { TarefaPainel } from '../components/tarefas/TarefaPainel';
import { Botao } from '../components/ui/Botao';
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina';
import { useRequisicao } from '../hooks/useRequisicao';
import { resumoService } from '../services/resumoService';
import { tarefaService } from '../services/tarefaService';
import type { StatusTarefa, Tarefa } from '../types/tarefa';
import { capitalizarPalavras, formatarDataExtenso } from '../utils/datas';
import estilos from './VisaoGeralPage.module.css';

export function VisaoGeralPage() {
  const resumo = useRequisicao(resumoService.obterResumo);
  const semana = useRequisicao(resumoService.obterResumoSemanal);
  const hoje = useRequisicao(tarefaService.listarHoje);
  const prazos = useRequisicao(tarefaService.listarProximosPrazos);
  const [erroAcao, setErroAcao] = useState<string | null>(null);
  const [novaTarefaAberta, setNovaTarefaAberta] = useState(false);

  function atualizarTudo() {
    resumo.atualizar();
    semana.atualizar();
    hoje.atualizar();
    prazos.atualizar();
  }

  async function alternarConclusao(tarefa: Tarefa) {
    const novoStatus: StatusTarefa = tarefa.status === 'CONCLUIDA' ? 'PENDENTE' : 'CONCLUIDA';
    setErroAcao(null);

    try {
      await tarefaService.atualizarStatus(tarefa.id, novoStatus);
      atualizarTudo();
    } catch {
      setErroAcao('Não foi possível atualizar a tarefa. Tente novamente.');
    }
  }

  function aoCriarTarefa() {
    setNovaTarefaAberta(false);
    atualizarTudo();
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Visão geral"
        subtitulo={capitalizarPalavras(formatarDataExtenso(new Date()))}
        acao={
          <Botao onClick={() => setNovaTarefaAberta(true)}>
            <Plus size={15} strokeWidth={2} aria-hidden="true" />
            Nova tarefa
          </Botao>
        }
      />

      {erroAcao && (
        <p className={estilos.erro} role="alert">
          {erroAcao}
        </p>
      )}

      <div className={estilos.secoes}>
        <IndicadoresResumo estado={resumo.estado} aoTentarNovamente={resumo.recarregar} />

        <div className={estilos.colunas}>
          <TarefasHoje
            estado={hoje.estado}
            aoTentarNovamente={hoje.recarregar}
            aoAlternarConclusao={alternarConclusao}
            aoAdicionarTarefa={() => setNovaTarefaAberta(true)}
          />
          <ProximosPrazos estado={prazos.estado} aoTentarNovamente={prazos.recarregar} />
        </div>

        <ResumoSemana estado={semana.estado} aoTentarNovamente={semana.recarregar} />
      </div>

      {novaTarefaAberta && (
        <TarefaPainel aoFechar={() => setNovaTarefaAberta(false)} aoSalvar={aoCriarTarefa} />
      )}
    </>
  );
}
