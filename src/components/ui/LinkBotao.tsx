import { Link, type LinkProps } from 'react-router-dom';
import estilos from './LinkBotao.module.css';

export function LinkBotao({ children, ...props }: LinkProps) {
  return (
    <Link {...props} className={estilos.botao}>
      {children}
    </Link>
  );
}
