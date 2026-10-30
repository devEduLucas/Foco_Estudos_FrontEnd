import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import estilos from './Layout.module.css';

export function Layout() {
  return (
    <div className={estilos.layout}>
      <Sidebar />
      <main className={estilos.principal}>
        <div className={estilos.conteudo}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
