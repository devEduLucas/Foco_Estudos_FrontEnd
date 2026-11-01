import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { Revelar } from '../ui/Revelar';
import estilos from './Home.module.css';

const PERGUNTAS = [
  {
    pergunta: 'Preciso cadastrar matérias antes de criar tarefas?',
    resposta:
      'Sim. Cada tarefa pertence a uma matéria, o que mantém tudo organizado e permite filtrar por disciplina. Cadastre suas matérias uma vez e reutilize-as durante o semestre.',
  },
  {
    pergunta: 'Como o FocoEstudos mostra o que está atrasado?',
    resposta:
      'Tarefas não concluídas com prazo vencido aparecem como atrasadas na visão geral, na lista de tarefas e no calendário, para você priorizar o que importa.',
  },
  {
    pergunta: 'Posso definir prioridade e acompanhar o andamento?',
    resposta:
      'Sim. Cada tarefa tem prioridade (baixa, média ou alta) e status (pendente, em andamento ou concluída). Você filtra por esses critérios na página de tarefas.',
  },
  {
    pergunta: 'Existe uma visão por calendário?',
    resposta:
      'Sim. O calendário mensal mostra os prazos de cada dia e permite abrir e editar a tarefa direto dali.',
  },
  {
    pergunta: 'Outras pessoas podem ver minhas matérias e tarefas?',
    resposta:
      'Não. Você acessa com e-mail e senha, e cada conta enxerga apenas as próprias matérias e tarefas.',
  },
  {
    pergunta: 'Funciona no celular?',
    resposta:
      'Sim. O layout se adapta a celulares, tablets e computadores, então você consulta seus prazos de onde estiver.',
  },
];

export function Duvidas() {
  const base = useId();
  const [aberto, setAberto] = useState<number | null>(null);
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);

  /** Setas, Home e End movem o foco entre as perguntas (padrão WAI-ARIA de acordeão). */
  function aoTeclar(evento: KeyboardEvent<HTMLButtonElement>, indice: number) {
    const ultimo = PERGUNTAS.length - 1;
    const destinos: Record<string, number> = {
      ArrowDown: indice === ultimo ? 0 : indice + 1,
      ArrowUp: indice === 0 ? ultimo : indice - 1,
      Home: 0,
      End: ultimo,
    };
    if (!(evento.key in destinos)) return;
    evento.preventDefault();
    botoes.current[destinos[evento.key]]?.focus();
  }

  return (
    <section id="duvidas" className={`${estilos.secao} ${estilos.ancora}`} aria-labelledby="titulo-duvidas">
      <div className={`${estilos.container} ${estilos.duvidasGrade}`}>
        <Revelar>
          <header className={estilos.cabecalhoSecao}>
            <p className={estilos.eyebrow}>Dúvidas</p>
            <h2 id="titulo-duvidas" className={estilos.tituloSecao}>
              Perguntas frequentes
            </h2>
            <p className={estilos.leadSecao}>Respostas rápidas sobre como o FocoEstudos funciona.</p>
          </header>
        </Revelar>

        <Revelar atraso={120}>
          <div className={estilos.acordeao}>
            {PERGUNTAS.map(({ pergunta, resposta }, indice) => {
              const estaAberto = aberto === indice;
              const idBotao = `${base}-botao-${indice}`;
              const idPainel = `${base}-painel-${indice}`;

              return (
                <div key={pergunta} className={estaAberto ? `${estilos.faq} ${estilos.faqAberto}` : estilos.faq}>
                  <h3 className={estilos.faqTitulo}>
                    <button
                      ref={(elemento) => {
                        botoes.current[indice] = elemento;
                      }}
                      id={idBotao}
                      type="button"
                      className={estilos.faqBotao}
                      aria-expanded={estaAberto}
                      aria-controls={idPainel}
                      onClick={() => setAberto(estaAberto ? null : indice)}
                      onKeyDown={(evento) => aoTeclar(evento, indice)}
                    >
                      {pergunta}
                      <ChevronDown className={estilos.faqSeta} size={20} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={idPainel} role="region" aria-labelledby={idBotao} className={estilos.faqPainel}>
                    <div className={estilos.faqConteudo}>
                      <p>{resposta}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Revelar>
      </div>
    </section>
  );
}
