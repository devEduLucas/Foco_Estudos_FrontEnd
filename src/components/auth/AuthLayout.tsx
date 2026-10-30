import type { ReactNode } from 'react';
import { AlignLeft } from 'lucide-react';
import estilos from './AuthLayout.module.css';

interface AuthLayoutProps {
  titulo: string;
  subtitulo: string;
  /** Texto com link para a outra tela de autenticação. */
  alternativa: ReactNode;
  children: ReactNode;
}

export function AuthLayout({ titulo, subtitulo, alternativa, children }: AuthLayoutProps) {
  return (
    <div className={estilos.pagina}>
      <div className={estilos.lateral}>
        <div className={estilos.marca}>
          <span className={estilos.logo} aria-hidden="true">
            <AlignLeft size={16} strokeWidth={1.75} />
          </span>
          <span className={estilos.nome}>FocoEstudos</span>
        </div>

        <div className={estilos.apresentacao}>
          <p className={estilos.eyebrow}>Seu espaço de estudos</p>
          <p className={estilos.destaque}>
            Organização para estudar
            <br />
            com mais clareza.
          </p>
          <p className={estilos.texto}>
            Reúna matérias, tarefas e prazos em um só lugar. Visualize o que importa e mantenha o foco
            nas suas prioridades.
          </p>
        </div>

        <p className={estilos.rodapeLateral}>Comece hoje a construir uma rotina mais organizada.</p>
      </div>

      <main className={estilos.principal}>
        <div className={estilos.bloco}>
          <h1 className={estilos.titulo}>{titulo}</h1>
          <p className={estilos.subtitulo}>{subtitulo}</p>

          {children}

          <div className={estilos.alternativa}>{alternativa}</div>
        </div>

        <p className={estilos.copyright}>© {new Date().getFullYear()} FocoEstudos</p>
      </main>
    </div>
  );
}
