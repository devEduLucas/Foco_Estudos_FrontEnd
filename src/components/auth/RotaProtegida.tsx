import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { sessao } from '../../services/sessao';

/** Só renderiza as rotas filhas se houver sessão válida; senão envia para o login. */
export function RotaProtegida() {
  const { pathname, search } = useLocation();
  if (sessao.autenticada()) return <Outlet />;
  return <Navigate to="/entrar" replace state={{ origem: pathname + search }} />;
}

/** Telas de login/cadastro: usuário já autenticado vai direto para o app. */
export function RotaPublica() {
  return sessao.autenticada() ? <Navigate to="/" replace /> : <Outlet />;
}
