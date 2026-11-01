import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ContextoTema } from './contextoTema';
import {
  aplicarTema,
  CHAVE_TEMA,
  observarSistema,
  salvarTema,
  temaDoSistema,
  temaInicial,
  temaSalvo,
  type Tema,
} from './tema';

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(temaInicial);

  useEffect(() => {
    // Sem escolha salva, acompanha o sistema operacional em tempo real.
    const pararSistema = observarSistema(() => {
      if (temaSalvo()) return;
      const novo = temaDoSistema();
      aplicarTema(novo, true);
      setTema(novo);
    });

    // Mantém abas abertas sincronizadas.
    function aoArmazenar(evento: StorageEvent) {
      if (evento.key !== CHAVE_TEMA) return;
      const novo = temaInicial();
      aplicarTema(novo, true);
      setTema(novo);
    }
    window.addEventListener('storage', aoArmazenar);

    return () => {
      pararSistema();
      window.removeEventListener('storage', aoArmazenar);
    };
  }, []);

  const alternar = useCallback(() => {
    const novo: Tema = tema === 'escuro' ? 'claro' : 'escuro';
    aplicarTema(novo, true);
    salvarTema(novo);
    setTema(novo);
  }, [tema]);

  const valor = useMemo(() => ({ tema, alternar }), [tema, alternar]);

  return <ContextoTema.Provider value={valor}>{children}</ContextoTema.Provider>;
}
