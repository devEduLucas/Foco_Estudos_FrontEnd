import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { AlternarTema } from '../ui/AlternarTema';
import { MesaEstudos } from './MesaEstudos';
import estilos from './AuthLayout.module.css';

interface AuthLayoutProps {
  titulo: string;
  subtitulo: string;
  /** Texto com link para a outra tela de autenticação. */
  alternativa: ReactNode;
  children: ReactNode;
}

const BENEFICIOS = ['Matérias organizadas', 'Prazos sob controle', 'Rotina mais produtiva'];

export function AuthLayout({ titulo, subtitulo, alternativa, children }: AuthLayoutProps) {
  return (
    <div className={`${estilos.pagina} paleta-marca`}>
      <aside className={estilos.lateral}>
        <div className={estilos.marca}>
          <span className={estilos.logo} aria-hidden="true">
            F
          </span>
          <span className={estilos.nome}>FocoEstudos</span>
        </div>

        <div className={estilos.apresentacao}>
          <p className={estilos.eyebrow}>Organização acadêmica</p>
          <p className={estilos.destaque}>Seu semestre em ordem, do planejamento à entrega.</p>
          <p className={estilos.texto}>
            Reúna matérias, tarefas e prazos em um só lugar. Visualize o que importa e mantenha o foco
            nas suas prioridades.
          </p>
          <ul className={estilos.beneficios}>
            {BENEFICIOS.map((beneficio) => (
              <li key={beneficio}>
                <Check size={16} strokeWidth={2} aria-hidden="true" />
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        <div className={estilos.ilustracao}>
          <MesaEstudos className={estilos.mesa} />
        </div>

        <p className={estilos.rodapeLateral}>Foco no que realmente importa.</p>
      </aside>

      <main className={estilos.principal}>
        <AlternarTema className={estilos.tema} />
        <div className={estilos.centro}>
          <section className={estilos.cartao}>
            <p className={estilos.marcaCartao}>FocoEstudos</p>
            <h1 className={estilos.titulo}>{titulo}</h1>
            <p className={estilos.subtitulo}>{subtitulo}</p>

            {children}

            <div className={estilos.alternativa}>{alternativa}</div>
          </section>
        </div>

        <p className={estilos.copyright}>© {new Date().getFullYear()} FocoEstudos</p>
      </main>
    </div>
  );
}
