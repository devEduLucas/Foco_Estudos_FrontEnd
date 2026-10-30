import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { Botao } from './Botao';
import estilos from './DialogoConfirmacao.module.css';

interface DialogoConfirmacaoProps {
  titulo: string;
  descricao: string;
  rotuloConfirmar: string;
  aoConfirmar: () => Promise<void>;
  mensagemDeErro: (erro: unknown) => string;
  aoCancelar: () => void;
}

export function DialogoConfirmacao({
  titulo,
  descricao,
  rotuloConfirmar,
  aoConfirmar,
  mensagemDeErro,
  aoCancelar,
}: DialogoConfirmacaoProps) {
  const idTitulo = useId();
  const idDescricao = useId();
  const dialogoRef = useRef<HTMLDialogElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (dialogo && !dialogo.open) dialogo.showModal();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  function aoClicarFora(evento: MouseEvent<HTMLDialogElement>) {
    if (evento.target === evento.currentTarget) aoCancelar();
  }

  async function confirmar() {
    setEnviando(true);
    setErro(null);
    try {
      await aoConfirmar();
    } catch (excecao) {
      setErro(mensagemDeErro(excecao));
      setEnviando(false);
    }
  }

  return (
    <dialog
      ref={dialogoRef}
      className={estilos.dialogo}
      aria-labelledby={idTitulo}
      aria-describedby={idDescricao}
      onClose={aoCancelar}
      onClick={aoClicarFora}
    >
      <div className={estilos.conteudo}>
        <h2 id={idTitulo} className={estilos.titulo}>
          {titulo}
        </h2>
        <p id={idDescricao} className={estilos.descricao}>
          {descricao}
        </p>
        {erro && (
          <p className={estilos.erro} role="alert">
            {erro}
          </p>
        )}
        <div className={estilos.acoes}>
          <Botao variante="secundario" onClick={aoCancelar}>
            Cancelar
          </Botao>
          <Botao variante="perigo" onClick={confirmar} disabled={enviando}>
            {enviando ? 'Aguarde...' : rotuloConfirmar}
          </Botao>
        </div>
      </div>
    </dialog>
  );
}
