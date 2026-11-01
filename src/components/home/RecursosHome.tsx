import { Book, Calendar, House, SquareCheck, type LucideIcon } from 'lucide-react';
import { Revelar } from '../ui/Revelar';
import estilos from './Home.module.css';

interface Recurso {
  icone: LucideIcon;
  titulo: string;
  texto: string;
}

const RECURSOS: Recurso[] = [
  {
    icone: Book,
    titulo: 'Matérias organizadas',
    texto: 'Cadastre as disciplinas do semestre e veja quantas tarefas pendentes cada uma tem.',
  },
  {
    icone: SquareCheck,
    titulo: 'Tarefas com prazo e prioridade',
    texto: 'Defina prazo, prioridade e status e filtre para enxergar só o que importa agora.',
  },
  {
    icone: Calendar,
    titulo: 'Calendário mensal',
    texto: 'Veja os prazos do mês de relance e abra ou edite uma tarefa direto no dia.',
  },
  {
    icone: House,
    titulo: 'Visão geral do semestre',
    texto: 'Indicadores de pendentes, em andamento, concluídas e atrasadas, com o progresso da semana.',
  },
];

export function RecursosHome() {
  return (
    <section id="recursos" className={`${estilos.secao} ${estilos.ancora}`} aria-labelledby="titulo-recursos">
      <div className={estilos.container}>
        <Revelar>
          <header className={estilos.cabecalhoSecao}>
            <p className={estilos.eyebrow}>Recursos</p>
            <h2 id="titulo-recursos" className={estilos.tituloSecao}>
              Tudo o que você precisa para não perder prazos
            </h2>
            <p className={estilos.leadSecao}>
              Ferramentas simples, pensadas para a rotina de quem estuda.
            </p>
          </header>
        </Revelar>

        <ul className={estilos.gradeRecursos}>
          {RECURSOS.map(({ icone: Icone, titulo, texto }, indice) => (
            <li key={titulo}>
              <Revelar atraso={indice * 80} className={estilos.alturaTotal}>
                <article className={estilos.cartao}>
                  <span className={estilos.icone} aria-hidden="true">
                    <Icone size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className={estilos.tituloCartao}>{titulo}</h3>
                  <p className={estilos.textoCartao}>{texto}</p>
                </article>
              </Revelar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
