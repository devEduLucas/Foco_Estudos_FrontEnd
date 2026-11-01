import { useEffect } from 'react';
import { ChamadaFinal } from '../components/home/ChamadaFinal';
import { CabecalhoHome } from '../components/home/CabecalhoHome';
import { ComoFunciona } from '../components/home/ComoFunciona';
import { Duvidas } from '../components/home/Duvidas';
import { HeroHome } from '../components/home/HeroHome';
import { RecursosHome } from '../components/home/RecursosHome';
import { RodapeHome } from '../components/home/RodapeHome';
import estilos from '../components/home/Home.module.css';

export function HomePage() {
  useEffect(() => {
    const anterior = document.title;
    document.title = 'FocoEstudos — Seu semestre em ordem';
    return () => {
      document.title = anterior;
    };
  }, []);

  return (
    <div id="topo" className={`${estilos.pagina} paleta-marca`}>
      <a href="#conteudo" className={estilos.pular}>
        Pular para o conteúdo
      </a>
      <CabecalhoHome />
      <main id="conteudo">
        <HeroHome />
        <RecursosHome />
        <ComoFunciona />
        <Duvidas />
        <ChamadaFinal />
      </main>
      <RodapeHome />
    </div>
  );
}
