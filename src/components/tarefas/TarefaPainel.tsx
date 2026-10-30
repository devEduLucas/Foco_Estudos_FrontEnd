import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useRequisicao } from '../../hooks/useRequisicao';
import { materiaService } from '../../services/materiaService';
import { tarefaService } from '../../services/tarefaService';
import type { PrioridadeTarefa, StatusTarefa, Tarefa, TarefaRequest } from '../../types/tarefa';
import { OPCOES_PRIORIDADE, OPCOES_STATUS } from '../../utils/opcoes';
import { Campo } from '../ui/Campo';
import { classeControle } from '../ui/classeControle';
import controles from '../ui/controles.module.css';
import { PainelLateral } from '../ui/PainelLateral';
import estilos from './TarefaPainel.module.css';

interface TarefaPainelProps {
  /** Tarefa em edição. Sem valor, o painel cria uma nova tarefa. */
  tarefa?: Tarefa;
  aoFechar: () => void;
  aoSalvar: () => void;
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

function valoresDaTarefa(tarefa?: Tarefa): Valores {
  if (!tarefa) return VALORES_INICIAIS;

  // O prazo é lido como texto para não deslocar o dia/horário por fuso horário.
  const partes = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}))?/.exec(tarefa.dataPrazo);

  return {
    titulo: tarefa.titulo,
    descricao: tarefa.descricao ?? '',
    materiaId: String(tarefa.materia.id),
    data: partes?.[1] ?? '',
    horario: partes?.[2] ?? '',
    prioridade: tarefa.prioridade,
    status: tarefa.status,
  };
}

function validar(valores: Valores): Erros {
  const erros: Erros = {};
  if (!valores.titulo.trim()) erros.titulo = 'Informe o título.';
  if (!valores.materiaId) erros.materiaId = 'Selecione uma matéria.';
  if (!valores.data) erros.data = 'Informe o prazo.';
  return erros;
}

export function TarefaPainel({ tarefa, aoFechar, aoSalvar }: TarefaPainelProps) {
  const editando = tarefa !== undefined;
  const materias = useRequisicao(materiaService.listar);

  const [valores, setValores] = useState<Valores>(() => valoresDaTarefa(tarefa));
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  function alterar<K extends keyof Valores>(campo: K, valor: Valores[K]) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const novosErros = validar(valores);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    setErroEnvio(null);

    const dados: TarefaRequest = {
      titulo: valores.titulo.trim(),
      descricao: valores.descricao.trim() || null,
      dataPrazo: `${valores.data}T${valores.horario || HORARIO_PADRAO}:00`,
      status: valores.status,
      prioridade: valores.prioridade,
      materiaId: Number(valores.materiaId),
    };

    try {
      if (tarefa) await tarefaService.atualizar(tarefa.id, dados);
      else await tarefaService.criar(dados);
      aoSalvar();
    } catch {
      setErroEnvio('Não foi possível salvar a tarefa. Tente novamente.');
      setEnviando(false);
    }
  }

  const estadoMaterias = materias.estado;
  const listaMaterias = estadoMaterias.status === 'sucesso' ? estadoMaterias.dados : [];
  const materiasIndisponiveis = estadoMaterias.status !== 'sucesso' || listaMaterias.length === 0;

  let textoPlaceholderMateria = 'Selecione uma matéria';
  if (estadoMaterias.status === 'carregando') textoPlaceholderMateria = 'Carregando matérias...';
  if (estadoMaterias.status === 'erro') textoPlaceholderMateria = 'Matérias indisponíveis';

  let ajudaMateria: ReactNode;
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
    <PainelLateral
      titulo={editando ? 'Editar tarefa' : 'Nova tarefa'}
      subtitulo={
        editando ? 'Atualize os dados da tarefa.' : 'Adicione uma atividade ao seu planejamento.'
      }
      aoFechar={aoFechar}
      aoEnviar={aoEnviar}
      rotuloEnviar={editando ? 'Salvar alterações' : 'Criar tarefa'}
      rotuloEnviando={editando ? 'Salvando...' : 'Criando...'}
      enviando={enviando}
      erro={erroEnvio}
    >
      <Campo rotulo="Título" obrigatorio erro={erros.titulo}>
        {(props) => (
          <input
            {...props}
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
    </PainelLateral>
  );
}
