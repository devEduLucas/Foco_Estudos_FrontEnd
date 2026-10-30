import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  FiltrosTarefas,
  type CampoFiltro,
  type ValoresFiltros,
} from '../components/tarefas/FiltrosTarefas';
import { TabelaTarefas } from '../components/tarefas/TabelaTarefas';
import { TarefaPainel } from '../components/tarefas/TarefaPainel';
import { Botao } from '../components/ui/Botao';
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina';
import { DialogoConfirmacao } from '../components/ui/DialogoConfirmacao';
import { ResultadoRequisicao } from '../components/ui/ResultadoRequisicao';
import { useRequisicao } from '../hooks/useRequisicao';
import { materiaService } from '../services/materiaService';
import { tarefaService } from '../services/tarefaService';
import type { StatusTarefa, Tarefa } from '../types/tarefa';
import { capitalizarPalavras, formatarDataExtenso } from '../utils/datas';
import { OPCOES_FILTRO_PRAZO, OPCOES_FILTRO_STATUS, OPCOES_PRIORIDADE } from '../utils/opcoes';
import estilos from './TarefasPage.module.css';

/** Devolve o valor da URL somente se ele for uma das opções válidas. */
function lerOpcao<T extends string>(valor: string | null, opcoes: { valor: T }[]): T | undefined {
  return opcoes.find((opcao) => opcao.valor === valor)?.valor;
}

function lerMateriaId(valor: string | null): number | undefined {
  const numero = Number(valor);
  return valor !== null && Number.isInteger(numero) && numero > 0 ? numero : undefined;
}

export function TarefasPage() {
  // Os filtros ficam na URL: permitem compartilhar a visão e o link "Visualizar" de Matérias.
  const [parametros, setParametros] = useSearchParams();
  const status = lerOpcao(parametros.get('status'), OPCOES_FILTRO_STATUS);
  const prioridade = lerOpcao(parametros.get('prioridade'), OPCOES_PRIORIDADE);
  const prazo = lerOpcao(parametros.get('prazo'), OPCOES_FILTRO_PRAZO);
  const materiaId = lerMateriaId(parametros.get('materiaId'));

  const listar = useCallback(
    (signal: AbortSignal) => tarefaService.listar({ status, prioridade, materiaId, prazo }, signal),
    [status, prioridade, materiaId, prazo],
  );
  const { estado, recarregar, atualizar } = useRequisicao(listar);
  const materias = useRequisicao(materiaService.listar);

  /** null: fechado. Objeto vazio: nova tarefa. Com `tarefa`: edição. */
  const [painel, setPainel] = useState<{ tarefa?: Tarefa } | null>(null);
  const [tarefaExcluida, setTarefaExcluida] = useState<Tarefa | null>(null);
  const [erroAcao, setErroAcao] = useState<string | null>(null);

  const valores: ValoresFiltros = {
    status: status ?? '',
    materiaId: materiaId ? String(materiaId) : '',
    prioridade: prioridade ?? '',
    prazo: prazo ?? '',
  };
  const temFiltros = Object.values(valores).some(Boolean);

  const opcoesMaterias =
    materias.estado.status === 'sucesso'
      ? materias.estado.dados.map((materia) => ({ valor: String(materia.id), rotulo: materia.nome }))
      : [];

  // Mantém a matéria da URL selecionada enquanto a lista carrega ou se ela não existir mais.
  if (materiaId && !opcoesMaterias.some((opcao) => opcao.valor === String(materiaId))) {
    opcoesMaterias.push({
      valor: String(materiaId),
      rotulo: materias.estado.status === 'carregando' ? 'Carregando...' : 'Matéria indisponível',
    });
  }

  function alterarFiltro(campo: CampoFiltro, valor: string) {
    setParametros(
      (atuais) => {
        const novos = new URLSearchParams(atuais);
        if (valor) novos.set(campo, valor);
        else novos.delete(campo);
        return novos;
      },
      { replace: true },
    );
  }

  function limparFiltros() {
    setParametros({}, { replace: true });
  }

  async function alternarConclusao(tarefa: Tarefa) {
    const novoStatus: StatusTarefa = tarefa.status === 'CONCLUIDA' ? 'PENDENTE' : 'CONCLUIDA';
    setErroAcao(null);

    try {
      await tarefaService.atualizarStatus(tarefa.id, novoStatus);
      atualizar();
    } catch {
      setErroAcao('Não foi possível atualizar a tarefa. Tente novamente.');
    }
  }

  function aoSalvar() {
    setPainel(null);
    atualizar();
  }

  async function excluir(tarefa: Tarefa) {
    await tarefaService.excluir(tarefa.id);
    setTarefaExcluida(null);
    atualizar();
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Tarefas"
        subtitulo={capitalizarPalavras(formatarDataExtenso(new Date()))}
        acao={
          <Botao onClick={() => setPainel({})}>
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
        <FiltrosTarefas
          valores={valores}
          opcoesMaterias={opcoesMaterias}
          aoAlterar={alterarFiltro}
          aoLimpar={limparFiltros}
        />

        <div className={estilos.cartao}>
          <ResultadoRequisicao estado={estado} aoTentarNovamente={recarregar}>
            {(tarefas) => {
              if (tarefas.length === 0) {
                return temFiltros ? (
                  <div className={estilos.vazio}>
                    <p>Nenhuma tarefa encontrada para os filtros selecionados.</p>
                    <Botao variante="secundario" onClick={limparFiltros}>
                      Limpar filtros
                    </Botao>
                  </div>
                ) : (
                  <div className={estilos.vazio}>
                    <p>Nenhuma tarefa cadastrada.</p>
                    <Botao onClick={() => setPainel({})}>Cadastrar tarefa</Botao>
                  </div>
                );
              }

              return (
                <TabelaTarefas
                  tarefas={tarefas}
                  aoAlternarConclusao={alternarConclusao}
                  aoEditar={(tarefa) => setPainel({ tarefa })}
                  aoExcluir={setTarefaExcluida}
                />
              );
            }}
          </ResultadoRequisicao>
        </div>
      </div>

      {painel && (
        <TarefaPainel tarefa={painel.tarefa} aoFechar={() => setPainel(null)} aoSalvar={aoSalvar} />
      )}

      {tarefaExcluida && (
        <DialogoConfirmacao
          titulo="Excluir tarefa"
          descricao={`Tem certeza de que deseja excluir “${tarefaExcluida.titulo}”? Esta ação não pode ser desfeita.`}
          rotuloConfirmar="Excluir"
          aoConfirmar={() => excluir(tarefaExcluida)}
          mensagemDeErro={() => 'Não foi possível excluir a tarefa. Tente novamente.'}
          aoCancelar={() => setTarefaExcluida(null)}
        />
      )}
    </>
  );
}
