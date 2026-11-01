import type { CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { MesaEstudos } from '../auth/MesaEstudos';
import { BotaoCta } from './BotaoCta';
import estilos from './Home.module.css';

const BENEFICIOS = ['Matérias organizadas', 'Prazos sob controle', 'Rotina mais produtiva'];

const passo = (indice: number) => ({ '--i': indice }) as CSSProperties;

export function HeroHome() {
  return (
    <section className={estilos.hero} aria-labelledby="titulo-hero">
      <div className={`${estilos.container} ${estilos.heroGrade}`}>
        <div className={estilos.heroTexto}>
          <p className={`${estilos.eyebrow} ${estilos.entrada}`} style={passo(0)}>
            Organização acadêmica
          </p>
          <h1 id="titulo-hero" className={`${estilos.heroTitulo} ${estilos.entrada}`} style={passo(1)}>
            Seu semestre em ordem, do planejamento à entrega.
          </h1>
          <p className={`${estilos.heroTexto2} ${estilos.entrada}`} style={passo(2)}>
            Reúna matérias, tarefas e prazos em um só lugar. Visualize o que importa e mantenha o foco
            nas suas prioridades.
          </p>

          <div className={`${estilos.heroAcoes} ${estilos.entrada}`} style={passo(3)}>
            <BotaoCta to="/cadastro" tamanho="lg" seta>
              Criar conta
            </BotaoCta>
            <BotaoCta to="/entrar" variante="secundario" tamanho="lg">
              Já tenho conta
            </BotaoCta>
          </div>

          <ul className={`${estilos.heroBeneficios} ${estilos.entrada}`} style={passo(4)}>
            {BENEFICIOS.map((beneficio) => (
              <li key={beneficio}>
                <Check size={16} strokeWidth={2} aria-hidden="true" />
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        <div className={estilos.heroVisual}>
          <div className={estilos.mesaEntrada}>
            <div className={estilos.mesaFlutua}>
              <MesaEstudos className={estilos.mesa} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
