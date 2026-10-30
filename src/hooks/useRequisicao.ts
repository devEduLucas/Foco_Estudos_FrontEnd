import { useCallback, useEffect, useState } from 'react';
import { isRequisicaoCancelada, mensagemDeErro } from '../utils/erros';

export type EstadoRequisicao<T> =
  | { status: 'carregando' }
  | { status: 'erro'; mensagem: string }
  | { status: 'sucesso'; dados: T };

/**
 * Executa uma requisição e expõe seu estado.
 * `requisicao` deve ter identidade estável (função de módulo, como os serviços).
 */
export function useRequisicao<T>(requisicao: (signal: AbortSignal) => Promise<T>) {
  const [estado, setEstado] = useState<EstadoRequisicao<T>>({ status: 'carregando' });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    requisicao(controlador.signal)
      .then((dados) => setEstado({ status: 'sucesso', dados }))
      .catch((erro: unknown) => {
        if (isRequisicaoCancelada(erro)) return;
        setEstado({ status: 'erro', mensagem: mensagemDeErro(erro) });
      });

    return () => controlador.abort();
  }, [requisicao, tentativa]);

  /** Volta ao estado de carregamento e refaz a requisição. */
  const recarregar = useCallback(() => {
    setEstado({ status: 'carregando' });
    setTentativa((n) => n + 1);
  }, []);

  /** Refaz a requisição mantendo os dados atuais na tela. */
  const atualizar = useCallback(() => setTentativa((n) => n + 1), []);

  return { estado, recarregar, atualizar };
}
