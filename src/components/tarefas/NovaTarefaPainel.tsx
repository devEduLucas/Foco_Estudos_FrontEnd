import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useRequisicao } from '../../hooks/useRequisicao';
import { materiaService } from '../../services/materiaService';
import { tarefaService } from '../../services/tarefaService';
import type { PrioridadeTarefa, StatusTarefa } from '../../types/tarefa';
import { OPCOES_PRIORIDADE, OPCOES_STATUS } from '../../utils/opcoes';
import { Botao } from '../ui/Botao';
import { Campo } from '../ui/Campo';
import controles from '../ui/controles.module.css';
import estilos from './NovaTarefaPainel.module.css';

interface NovaTarefaPainelProps {
  aoFechar: () => void;
  aoCriar: () => void;
}

interface Valores {
  titulo: string;
  descricao: string;
  materiaId: string;
  data: string;
  horario: string;
  prioridade: PrioridadeTarefa;
  status: StatusTarefa;
}

type Erros = Partial<Record<'titulo' | 'materiaId' | 'data', string>>;

const VALORES_INICIAIS: Valores = {
  titulo: '',
  descricao: '',
  materiaId: '',
  data: '',
  horario: '',
  prioridade: 'BAIXA',
  status: 'PENDENTE',
};

/** Horário usado quando o prazo é informado sem horário. */
const HORARIO_PADRAO = '23:59';

function validar(valores: Valores): Erros {
  const erros: Erros = {};
  if (!valores.titulo.trim()) erros.titulo = 'Informe o título.';
  if (!valores.materiaId) erros.materiaId = 'Selecione uma matéria.';
  if (!valores.data) erros.data = 'Informe o prazo.';
  return erros;
}

function classeControle(invalido: boolean, extra?: string): string {
  return [controles.controle, invalido ? controles.invalido : '', extra ?? '']
    .filter(Boolean)
    .join(' ');
}

export function NovaTarefaPainel({ aoFechar, aoCriar }: NovaTarefaPainelProps) {
  const idTitulo = useId();
  const dialogoRef = useRef<HTMLDialogElement>(null);
  const tituloRef = useRef<HTMLInputElement>(null);
  const materias = useRequisicao(materiaService.listar);

  const [valores, setValores] = useState<Valores>(VALORES_INICIAIS);
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (dialogo && !dialogo.open) dialogo.showModal();
    tituloRef.current?.focus();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  function alterar<K extends keyof Valores>(campo: K, valor: Valores[K]) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  function aoClicarFora(evento: MouseEvent<HTMLDialogElement>) {
    if (evento.target === evento.currentTarget) aoFechar();
  }

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const novosErros = validar(valores);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    setErroEnvio(null);

    try {
      await tarefaService.criar({
        titulo: valores.titulo.trim(),
        descricao: valores.descricao.trim() || null,
        dataPrazo: `${valores.data}T${valores.horario || HORARIO_PADRAO}:00`,
        status: valores.status,
        prioridade: valores.prioridade,
        materiaId: Number(valores.materiaId),
      });
      aoCriar();
    } catch {
      setErroEnvio('Não foi possível criar a tarefa. Tente novamente.');
      setEnviando(false);
    }
  }

  const estadoMaterias = materias.estado;
  const listaMaterias = estadoMaterias.status === 'sucesso' ? estadoMaterias.dados : [];
  const materiasIndisponiveis = estadoMaterias.status !== 'sucesso' || listaMaterias.length === 0;

  let textoPlaceholderMateria = 'Selecione uma matéria';
  if (estadoMaterias.status === 'carregando') textoPlaceholderMateria = 'Carregando matérias...';
  if (estadoMaterias.status === 'erro') textoPlaceholderMateria = 'Matérias indisponíveis';

  let ajudaMateria;
  if (estadoMaterias.status === 'erro') {
    ajudaMateria = (
      <>
        {estadoMaterias.mensagem}{' '}
        <button type="button" className={estilos.acaoTexto} onClick={materias.recarregar}>
          Tentar novamente
        </button>
      </>
    );
  } else if (estadoMaterias.status === 'sucesso' && listaMaterias.length === 0) {
    ajudaMateria = (
      <>
        Nenhuma matéria cadastrada.{' '}
        <Link to="/materias" className={estilos.acaoTexto}>
          Cadastrar matéria
        </Link>
      </>
    );
  }

  return (
    <dialog
      ref={dialogoRef}
      className={estilos.dialogo}
      aria-labelledby={idTitulo}
      onClose={aoFechar}
      onClick={aoClicarFora}
    >
      <div className={estilos.painel}>
        <header className={estilos.cabecalho}>
          <div>
            <h2 id={idTitulo} className={estilos.titulo}>
              Nova tarefa
            </h2>
            <p className={estilos.subtitulo}>Adicione uma atividade ao seu planejamento.</p>
          </div>
          <button type="button" className={estilos.fechar} onClick={aoFechar} aria-label="Fechar">
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        <form className={estilos.formulario} onSubmit={aoEnviar} noValidate>
          <div className={estilos.corpo}>
            <Campo rotulo="Título" obrigatorio erro={erros.titulo}>
              {(props) => (
                <input
                  {...props}
                  ref={tituloRef}
                  type="text"
                  className={classeControle(Boolean(erros.titulo))}
                  placeholder="Ex.: Entregar lista de exercícios"
                  value={valores.titulo}
                  onChange={(e) => alterar('titulo', e.target.value)}
                />
              )}
            </Campo>

            <Campo rotulo="Descrição" opcional>
              {(props) => (
                <textarea
                  {...props}
                  className={classeControle(false, controles.areaTexto)}
                  placeholder="Adicione detalhes importantes..."
                  value={valores.descricao}
                  onChange={(e) => alterar('descricao', e.target.value)}
                />
              )}
            </Campo>

            <Campo rotulo="Matéria" obrigatorio erro={erros.materiaId} ajuda={ajudaMateria}>
              {(props) => (
                <select
                  {...props}
                  className={classeControle(Boolean(erros.materiaId))}
                  value={valores.materiaId}
                  disabled={materiasIndisponiveis}
                  onChange={(e) => alterar('materiaId', e.target.value)}
                >
                  <option value="">{textoPlaceholderMateria}</option>
                  {listaMaterias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.nome}
                    </option>
                  ))}
                </select>
              )}
            </Campo>

            <div className={estilos.duasColunas}>
              <Campo rotulo="Prazo" obrigatorio erro={erros.data}>
                {(props) => (
                  <input
                    {...props}
                    type="date"
                    className={classeControle(Boolean(erros.data))}
                    value={valores.data}
                    onChange={(e) => alterar('data', e.target.value)}
                  />
                )}
              </Campo>

              <Campo rotulo="Horário">
                {(props) => (
                  <input
                    {...props}
                    type="time"
                    className={classeControle(false)}
                    value={valores.horario}
                    onChange={(e) => alterar('horario', e.target.value)}
                  />
                )}
              </Campo>
            </div>

            <div className={estilos.duasColunas}>
              <Campo rotulo="Prioridade">
                {(props) => (
                  <select
                    {...props}
                    className={classeControle(false)}
                    value={valores.prioridade}
                    onChange={(e) => alterar('prioridade', e.target.value as PrioridadeTarefa)}
                  >
                    {OPCOES_PRIORIDADE.map((opcao) => (
                      <option key={opcao.valor} value={opcao.valor}>
                        {opcao.rotulo}
                      </option>
                    ))}
                  </select>
                )}
              </Campo>

              <Campo rotulo="Status">
                {(props) => (
                  <select
                    {...props}
                    className={classeControle(false)}
                    value={valores.status}
                    onChange={(e) => alterar('status', e.target.value as StatusTarefa)}
                  >
                    {OPCOES_STATUS.map((opcao) => (
                      <option key={opcao.valor} value={opcao.valor}>
                        {opcao.rotulo}
                      </option>
                    ))}
                  </select>
                )}
              </Campo>
            </div>

            {erroEnvio && (
              <p className={estilos.erroEnvio} role="alert">
                {erroEnvio}
              </p>
            )}
          </div>

          <div className={estilos.rodape}>
            <Botao variante="secundario" onClick={aoFechar}>
              Cancelar
            </Botao>
            <Botao type="submit" disabled={enviando}>
              {enviando ? 'Criando...' : 'Criar tarefa'}
            </Botao>
          </div>
        </form>
      </div>
    </dialog>
  );
}
