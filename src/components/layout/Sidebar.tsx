import { NavLink, useNavigate } from 'react-router-dom';
import { Book, Calendar, House, LogOut, SquareCheck, type LucideIcon } from 'lucide-react';
import { authService } from '../../services/authService';
import estilos from './Sidebar.module.css';

interface ItemNavegacao {
  to: string;
  rotulo: string;
  icone: LucideIcon;
  exato?: boolean;
}

const itens: ItemNavegacao[] = [
  { to: '/', rotulo: 'Visão geral', icone: House, exato: true },
  { to: '/materias', rotulo: 'Matérias', icone: Book },
  { to: '/tarefas', rotulo: 'Tarefas', icone: SquareCheck },
  { to: '/calendario', rotulo: 'Calendário', icone: Calendar },
];

export function Sidebar() {
  const navigate = useNavigate();

  function sair() {
    authService.sair();
    navigate('/entrar', { replace: true });
  }

  return (
    <aside className={estilos.sidebar}>
      <div className={estilos.marca}>
        <span className={estilos.logo} aria-hidden="true">
          F
        </span>
        <span className={estilos.nome}>FocoEstudos</span>
      </div>

      <nav aria-label="Navegação principal">
        <ul className={estilos.lista}>
          {itens.map(({ to, rotulo, icone: Icone, exato }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exato}
                className={({ isActive }) =>
                  isActive ? `${estilos.link} ${estilos.ativo}` : estilos.link
                }
              >
                <Icone size={17} strokeWidth={1.75} aria-hidden="true" />
                {rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className={`${estilos.link} ${estilos.sair}`} onClick={sair}>
        <LogOut size={17} strokeWidth={1.75} aria-hidden="true" />
        Sair
      </button>
    </aside>
  );
}
