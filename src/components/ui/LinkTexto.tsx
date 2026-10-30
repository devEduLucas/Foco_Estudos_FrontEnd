import { Link, type LinkProps } from 'react-router-dom';
import estilos from './LinkTexto.module.css';

export function LinkTexto({ children, ...props }: LinkProps) {
  return (
    <Link {...props} className={estilos.link}>
      {children}
    </Link>
  );
}
