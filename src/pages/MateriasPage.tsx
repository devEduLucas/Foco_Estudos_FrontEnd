import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { MateriaPainel } from '../components/materias/MateriaPainel';
import { TabelaMaterias } from '../components/materias/TabelaMaterias';
import { Botao } from '../components/ui/Botao';
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina';
import { classeControle } from '../components/ui/classeControle';
import { DialogoConfirmacao } from '../components/ui/DialogoConfirmacao';
import { ResultadoRequisicao } from '../components/ui/ResultadoRequisicao';
import { useRequisicao } from '../hooks/useRequisicao';
import { materiaService } from '../services/materiaService';
import type { Materia } from '../types/materia';
import { capitalizarPalavras, formatarDataExtenso } from '../utils/datas';
import { statusDoErro } from '../utils/erros';
import { normalizarTexto } from '../utils/materias';
import estilos from './MateriasPage.module.css';

function Resumo({ quantidade }: { quantidade: number }) {
  if (quantidade === 0) return <>Nenhuma matéria cadastrada</>;
  return (
    <>
      <strong>
        {quantidade} {quantidade === 1 ? 'matéria' : 'matérias'}
      </strong>{' '}
      {quantidade === 1 ? 'cadastrada' : 'cadastradas'}
    </>
  );
}

export function MateriasPage() {
  const idBusca = useId();
  const { estado, recarregar, atualizar } = useRequisicao(materiaService.listar);
  const [busca, setBusca] = useState('');
  /** null: fechado. Objeto vazio: nova matéria. Com `materia`: edição. */
  const [painel, setPainel] = useState<{ materia?: Materia } | null>(null);
  const [materiaExcluida, setMateriaExcluida] = useState<Materia | null>(null);

  const termo = normalizarTexto(busca.trim());

  function aoSalvar() {
    setPainel(null);
    atualizar();
  }

  async function excluir(materia: Materia) {
    await materiaService.excluir(materia.id);
    setMateriaExcluida(null);
    atualizar();
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Matérias"
        subtitulo={capitalizarPalavras(formatarDataExtenso(new Date()))}
        acao={
          <Botao onClick={() => setPainel({})}>
            <Plus size={15} strokeWidth={2} aria-hidden="true" />
            Nova matéria
          </Botao>
        }
      />

      <div className={estilos.barra}>
        <p className={estilos.resumo}>
          {estado.status === 'sucesso' && <Resumo quantidade={estado.dados.length} />}
        </p>

        <div>
          <label htmlFor={idBusca} className="sr-only">
            Buscar matéria
          </label>
          <input
            id={idBusca}
            type="search"
            className={classeControle(false, estilos.busca)}
            placeholder="Buscar matéria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className={estilos.cartao}>
        <ResultadoRequisicao estado={estado} aoTentarNovamente={recarregar}>
          {(materias) => {
            if (materias.length === 0) {
              return (
                <div className={estilos.vazio}>
                  <p>Nenhuma matéria cadastrada.</p>
                  <Botao onClick={() => setPainel({})}>Cadastrar matéria</Botao>
                </div>
              );
            }

            const filtradas = termo
              ? materias.filter((m) => normalizarTexto(m.nome).includes(termo))
              : materias;

            if (filtradas.length === 0) {
              return <p className={estilos.vazio}>Nenhuma matéria encontrada para “{busca.trim()}”.</p>;
            }

            return (
              <TabelaMaterias
                materias={filtradas}
                aoEditar={(materia) => setPainel({ materia })}
                aoExcluir={setMateriaExcluida}
              />
            );
          }}
        </ResultadoRequisicao>
      </div>

      {painel && (
        <MateriaPainel
          materia={painel.materia}
          aoFechar={() => setPainel(null)}
          aoSalvar={aoSalvar}
        />
      )}

      {materiaExcluida && (
        <DialogoConfirmacao
          titulo="Excluir matéria"
          descricao={`Tem certeza de que deseja excluir “${materiaExcluida.nome}”? Esta ação não pode ser desfeita.`}
          rotuloConfirmar="Excluir"
          aoConfirmar={() => excluir(materiaExcluida)}
          mensagemDeErro={(erro) =>
            statusDoErro(erro) === 409
              ? 'Não é possível excluir uma matéria que possui tarefas.'
              : 'Não foi possível excluir a matéria. Tente novamente.'
          }
          aoCancelar={() => setMateriaExcluida(null)}
        />
      )}
    </>
  );
}
