import { useId, type ReactNode } from 'react';
import estilos from './Campo.module.css';

interface PropsControle {
  id: string;
  'aria-invalid'?: true;
  'aria-required'?: true;
  'aria-describedby'?: string;
}

interface CampoProps {
  rotulo: string;
  obrigatorio?: boolean;
  opcional?: boolean;
  erro?: string;
  ajuda?: ReactNode;
  /** Rótulo e espaçamento maiores, usados nas telas de autenticação. */
  grande?: boolean;
  children: (propsControle: PropsControle) => ReactNode;
}

export function Campo({ rotulo, obrigatorio, opcional, erro, ajuda, grande, children }: CampoProps) {
  const id = useId();
  const idMensagem = `${id}-mensagem`;
  const mensagem = erro ?? ajuda;

  return (
    <div className={grande ? `${estilos.campo} ${estilos.grande}` : estilos.campo}>
      <div className={estilos.linha}>
        <label htmlFor={id} className={estilos.rotulo}>
          {rotulo}
        </label>
        {obrigatorio && (
          <span className={estilos.obrigatorio} aria-hidden="true">
            *
          </span>
        )}
        {opcional && <span className={estilos.opcional}>Opcional</span>}
      </div>

      {children({
        id,
        'aria-invalid': erro ? true : undefined,
        'aria-required': obrigatorio ? true : undefined,
        'aria-describedby': mensagem ? idMensagem : undefined,
      })}

      {mensagem && (
        <div
          id={idMensagem}
          className={erro ? estilos.erro : estilos.ajuda}
          role={erro ? 'alert' : undefined}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
}
