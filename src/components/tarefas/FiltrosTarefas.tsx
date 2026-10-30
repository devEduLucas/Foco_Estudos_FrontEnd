import { useId } from 'react';
import { ListFilter } from 'lucide-react';
import { OPCOES_FILTRO_PRAZO, OPCOES_FILTRO_STATUS, OPCOES_PRIORIDADE } from '../../utils/opcoes';
import { classeControle } from '../ui/classeControle';
import estilos from './FiltrosTarefas.module.css';

export type CampoFiltro = 'status' | 'materiaId' | 'prioridade' | 'prazo';

export type ValoresFiltros = Record<CampoFiltro, string>;

interface OpcaoSelect {
  valor: string;
  rotulo: string;
}

interface FiltrosTarefasProps {
  valores: ValoresFiltros;
  opcoesMaterias: OpcaoSelect[];
  aoAlterar: (campo: CampoFiltro, valor: string) => void;
  aoLimpar: () => void;
}

interface DefinicaoCampo {
  campo: CampoFiltro;
  rotulo: string;
  semFiltro: string;
  opcoes: OpcaoSelect[];
}

export function FiltrosTarefas({ valores, opcoesMaterias, aoAlterar, aoLimpar }: FiltrosTarefasProps) {
  const idBase = useId();

  const campos: DefinicaoCampo[] = [
    { campo: 'status', rotulo: 'Status', semFiltro: 'Todos', opcoes: OPCOES_FILTRO_STATUS },
    { campo: 'materiaId', rotulo: 'Matéria', semFiltro: 'Todas', opcoes: opcoesMaterias },
    { campo: 'prioridade', rotulo: 'Prioridade', semFiltro: 'Todas', opcoes: OPCOES_PRIORIDADE },
    { campo: 'prazo', rotulo: 'Prazo', semFiltro: 'Qualquer data', opcoes: OPCOES_FILTRO_PRAZO },
  ];

  const algumFiltroAtivo = campos.some(({ campo }) => valores[campo] !== '');

  return (
    <section className={estilos.barra} aria-label="Filtros de tarefas">
      <h2 className={estilos.titulo}>
        <ListFilter size={17} strokeWidth={1.75} aria-hidden="true" />
        Filtros
      </h2>

      <div className={estilos.campos}>
        {campos.map(({ campo, rotulo, semFiltro, opcoes }) => {
          const id = `${idBase}-${campo}`;
          return (
            <div key={campo} className={estilos.campo}>
              <label htmlFor={id} className={estilos.rotulo}>
                {rotulo}
              </label>
              <select
                id={id}
                className={classeControle(false, estilos.select)}
                value={valores[campo]}
                onChange={(e) => aoAlterar(campo, e.target.value)}
              >
                <option value="">{semFiltro}</option>
                {opcoes.map((opcao) => (
                  <option key={opcao.valor} value={opcao.valor}>
                    {opcao.rotulo}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {algumFiltroAtivo && (
        <button type="button" className={estilos.limpar} onClick={aoLimpar}>
          Limpar filtros
        </button>
      )}
    </section>
  );
}
