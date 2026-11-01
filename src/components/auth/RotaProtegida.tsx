import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { sessao } from '../../services/sessao';

interface RotaProtegidaProps {
  /** Conteúdo exibido a visitantes na raiz ("/") em vez de redirecioná-los ao login. */
  visitanteNaRaiz?: ReactNode;
}

/** Só renderiza as rotas filhas se houver sessão válida; senão envia para o login. */
export function RotaProtegida({ visitanteNaRaiz }: RotaProtegidaProps) {
  const { pathname, search } = useLocation();
  if (sessao.autenticada()) return <Outlet />;
  if (visitanteNaRaiz && pathname === '/') return <>{visitanteNaRaiz}</>;
  return <Navigate to="/entrar" replace state={{ origem: pathname + search }} />;
}

/** Telas de login/cadastro: usuário já autenticado vai direto para o app. */
export function RotaPublica() {
  return sessao.autenticada() ? <Navigate to="/" replace /> : <Outlet />;
}
