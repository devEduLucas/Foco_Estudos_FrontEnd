import { Link } from 'react-router-dom';
import estilos from './Home.module.css';

export function RodapeHome() {
  return (
    <footer className={estilos.rodape}>
      <div className={`${estilos.container} ${estilos.rodapeInterno}`}>
        <div>
          <p className={estilos.marca}>
            <span className={estilos.logo} aria-hidden="true">
              F
            </span>
            <span className={estilos.nomeMarca}>FocoEstudos</span>
          </p>
          <p className={estilos.rodapeFrase}>Foco no que realmente importa.</p>
        </div>

        <nav className={estilos.rodapeLinks} aria-label="Rodapé">
          <Link to="/entrar">Entrar</Link>
          <Link to="/cadastro">Criar conta</Link>
          <a href="#duvidas">Dúvidas</a>
        </nav>

        <p className={estilos.rodapeCopy}>© {new Date().getFullYear()} FocoEstudos</p>
      </div>
    </footer>
  );
}
