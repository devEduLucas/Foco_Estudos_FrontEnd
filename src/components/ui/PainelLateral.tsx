import { useEffect, useId, useRef, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Botao } from './Botao';
import estilos from './PainelLateral.module.css';

interface PainelLateralProps {
  titulo: string;
  subtitulo: string;
  aoFechar: () => void;
  aoEnviar: (evento: FormEvent<HTMLFormElement>) => void;
  rotuloEnviar: string;
  rotuloEnviando: string;
  enviando: boolean;
  erro?: string | null;
  children: ReactNode;
}

export function PainelLateral({
  titulo,
  subtitulo,
  aoFechar,
  aoEnviar,
  rotuloEnviar,
  rotuloEnviando,
  enviando,
  erro,
  children,
}: PainelLateralProps) {
  const idTitulo = useId();
  const dialogoRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (dialogo && !dialogo.open) dialogo.showModal();
    dialogo?.querySelector<HTMLElement>('input, textarea, select')?.focus();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  function aoClicarFora(evento: MouseEvent<HTMLDialogElement>) {
    if (evento.target === evento.currentTarget) aoFechar();
  }

  return (
    <dialog
      ref={dialogoRef}
      className={estilos.dialogo}
      aria-labelledby={idTitulo}
      onClose={aoFechar}
      onClick={aoClicarFora}
    >
      <div className={estilos.painel}>
        <header className={estilos.cabecalho}>
          <div>
            <h2 id={idTitulo} className={estilos.titulo}>
              {titulo}
            </h2>
            <p className={estilos.subtitulo}>{subtitulo}</p>
          </div>
          <button type="button" className={estilos.fechar} onClick={aoFechar} aria-label="Fechar">
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        <form className={estilos.formulario} onSubmit={aoEnviar} noValidate>
          <div className={estilos.corpo}>
            {children}
            {erro && (
              <p className={estilos.erro} role="alert">
                {erro}
              </p>
            )}
          </div>

          <div className={estilos.rodape}>
            <Botao variante="secundario" onClick={aoFechar}>
              Cancelar
            </Botao>
            <Botao type="submit" disabled={enviando}>
              {enviando ? rotuloEnviando : rotuloEnviar}
            </Botao>
          </div>
        </form>
      </div>
    </dialog>
  );
}
