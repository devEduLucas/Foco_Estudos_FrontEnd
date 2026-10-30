import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { classeControle } from '../ui/classeControle';
import controles from '../ui/controles.module.css';
import estilos from './CampoSenha.module.css';

interface CampoSenhaProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  invalido?: boolean;
}

export function CampoSenha({ invalido = false, ...props }: CampoSenhaProps) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className={estilos.envoltorio}>
      <input
        {...props}
        type={visivel ? 'text' : 'password'}
        className={classeControle(invalido, controles.alto, estilos.comIcone)}
      />
      <button
        type="button"
        className={estilos.alternar}
        onClick={() => setVisivel((atual) => !atual)}
        aria-label={visivel ? 'Ocultar senha' : 'Mostrar senha'}
        aria-pressed={visivel}
      >
        {visivel ? (
          <EyeOff size={16} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
