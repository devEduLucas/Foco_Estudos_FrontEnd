import type { CSSProperties, ReactNode } from 'react';
import { useRevelar } from '../../hooks/useRevelar';
import { Revelar } from '../ui/Revelar';
import estilos from './Home.module.css';

interface Passo {
  titulo: string;
  texto: string;
  visual: ReactNode;
}

const PASSOS: Passo[] = [
  {
    titulo: 'Crie sua conta',
    texto: 'Cadastre-se com nome, e-mail e senha em poucos segundos.',
    visual: (
      <>
        <span className={estilos.campoMini} />
        <span className={estilos.campoMini} />
        <span className={`${estilos.campoMini} ${estilos.campoMiniCurto}`} />
        <span className={estilos.botaoMini} />
      </>
    ),
  },
  {
    titulo: 'Cadastre suas matérias',
    texto: 'Adicione as disciplinas do semestre para agrupar suas tarefas.',
    visual: (
      <div className={estilos.chips}>
        <span className={estilos.chip}>Cálculo II</span>
        <span className={estilos.chip}>Física</span>
        <span className={estilos.chip}>Algoritmos</span>
      </div>
    ),
  },
  {
    titulo: 'Registre tarefas e prazos',
    texto: 'Defina prazo, prioridade e status de cada atividade.',
    visual: (
      <div className={estilos.tarefaMini}>
        <span className={estilos.caixaMini} />
        <span className={estilos.tarefaTexto}>Lista de exercícios</span>
        <span className={`${estilos.chip} ${estilos.chipDestaque}`}>Sex · Alta</span>
      </div>
    ),
  },
  {
    titulo: 'Acompanhe a evolução',
    texto: 'Use a visão geral e o calendário para saber o que vem pela frente.',
    visual: (
      <div>
        <div className={estilos.progressoTopo}>
          <span>Progresso da semana</span>
          <strong>60%</strong>
        </div>
        <div className={estilos.trilho}>
          <span className={estilos.preenchimento} />
        </div>
      </div>
    ),
  },
];

export function ComoFunciona() {
  const { ref, visivel } = useRevelar<HTMLOListElement>();

  return (
    <section
      id="como-funciona"
      className={`${estilos.secao} ${estilos.secaoDestacada} ${estilos.ancora}`}
      aria-labelledby="titulo-como-funciona"
    >
      <div className={estilos.container}>
        <Revelar>
          <header className={estilos.cabecalhoSecao}>
            <p className={estilos.eyebrow}>Como funciona</p>
            <h2 id="titulo-como-funciona" className={estilos.tituloSecao}>
              Do cadastro ao semestre sob controle em quatro passos
            </h2>
          </header>
        </Revelar>

        <ol ref={ref} className={visivel ? `${estilos.passos} ${estilos.passosVisiveis}` : estilos.passos}>
          {PASSOS.map(({ titulo, texto, visual }, indice) => (
            <li key={titulo} className={estilos.passo} style={{ '--i': indice } as CSSProperties}>
              <span className={estilos.numero} aria-hidden="true">
                {indice + 1}
              </span>
              <h3 className={estilos.tituloCartao}>
                <span className="sr-only">Passo {indice + 1}: </span>
                {titulo}
              </h3>
              <p className={estilos.textoCartao}>{texto}</p>
              <div className={estilos.mini} aria-hidden="true">
                {visual}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
