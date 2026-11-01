import { Moon, Sun } from 'lucide-react';
import { useTema } from '../../tema/useTema';
import estilos from './AlternarTema.module.css';

interface AlternarTemaProps {
  className?: string;
  /** Mostra o texto ao lado do ícone (uso na barra lateral). */
  comRotulo?: boolean;
}

export function AlternarTema({ className, comRotulo = false }: AlternarTemaProps) {
  const { tema, alternar } = useTema();
  const escuro = tema === 'escuro';
  const acao = escuro ? 'Ativar tema claro' : 'Ativar tema escuro';

  return (
    <button
      type="button"
      className={[comRotulo ? '' : estilos.botao, className ?? ''].filter(Boolean).join(' ')}
      onClick={alternar}
      aria-label={comRotulo ? undefined : acao}
      title={acao}
      data-escuro={escuro}
    >
      <span className={estilos.icones} aria-hidden="true">
        <Sun className={estilos.sol} size={17} strokeWidth={1.75} />
        <Moon className={estilos.lua} size={17} strokeWidth={1.75} />
      </span>
      {comRotulo && (escuro ? 'Tema claro' : 'Tema escuro')}
    </button>
  );
}
