import { useState, type FormEvent } from 'react';
import { materiaService } from '../../services/materiaService';
import type { Materia, MateriaRequest } from '../../types/materia';
import { statusDoErro } from '../../utils/erros';
import { Campo } from '../ui/Campo';
import { classeControle } from '../ui/classeControle';
import controles from '../ui/controles.module.css';
import { PainelLateral } from '../ui/PainelLateral';

interface MateriaPainelProps {
  /** Matéria em edição. Sem valor, o painel cria uma nova matéria. */
  materia?: Materia;
  aoFechar: () => void;
  aoSalvar: () => void;
}

export function MateriaPainel({ materia, aoFechar, aoSalvar }: MateriaPainelProps) {
  const editando = materia !== undefined;
  const [nome, setNome] = useState(materia?.nome ?? '');
  const [descricao, setDescricao] = useState(materia?.descricao ?? '');
  const [erroNome, setErroNome] = useState<string | undefined>();
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!nome.trim()) {
      setErroNome('Informe o nome da matéria.');
      return;
    }

    setEnviando(true);
    setErroEnvio(null);
    const dados: MateriaRequest = { nome: nome.trim(), descricao: descricao.trim() || null };

    try {
      if (materia) await materiaService.atualizar(materia.id, dados);
      else await materiaService.criar(dados);
      aoSalvar();
    } catch (erro) {
      setErroEnvio(
        statusDoErro(erro) === 409
          ? 'Já existe uma matéria com este nome.'
          : 'Não foi possível salvar a matéria. Tente novamente.',
      );
      setEnviando(false);
    }
  }

  return (
    <PainelLateral
      titulo={editando ? 'Editar matéria' : 'Nova matéria'}
      subtitulo={
        editando ? 'Atualize os dados da matéria.' : 'Cadastre uma disciplina para organizar suas tarefas.'
      }
      aoFechar={aoFechar}
      aoEnviar={aoEnviar}
      rotuloEnviar={editando ? 'Salvar alterações' : 'Criar matéria'}
      rotuloEnviando={editando ? 'Salvando...' : 'Criando...'}
      enviando={enviando}
      erro={erroEnvio}
    >
      <Campo rotulo="Nome" obrigatorio erro={erroNome}>
        {(props) => (
          <input
            {...props}
            type="text"
            className={classeControle(Boolean(erroNome))}
            placeholder="Ex.: Banco de Dados"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setErroNome(undefined);
            }}
          />
        )}
      </Campo>

      <Campo rotulo="Descrição" opcional>
        {(props) => (
          <textarea
            {...props}
            className={classeControle(false, controles.areaTexto)}
            placeholder="Do que trata esta matéria?"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        )}
      </Campo>
    </PainelLateral>
  );
}
