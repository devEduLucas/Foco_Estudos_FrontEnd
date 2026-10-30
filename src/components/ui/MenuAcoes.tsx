import { useEffect, useRef, useState } from 'react';
import { Ellipsis } from 'lucide-react';
import estilos from './MenuAcoes.module.css';

interface ItemMenu {
  rotulo: string;
  aoSelecionar: () => void;
  perigo?: boolean;
}

interface MenuAcoesProps {
  rotulo: string;
  itens: ItemMenu[];
}

export function MenuAcoes({ rotulo, itens }: MenuAcoesProps) {
  const [aberto, setAberto] = useState(false);
  const raizRef = useRef<HTMLDivElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;

    function aoClicarFora(evento: MouseEvent) {
      if (!raizRef.current?.contains(evento.target as Node)) setAberto(false);
    }

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        setAberto(false);
        gatilhoRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoPressionarTecla);
    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoPressionarTecla);
    };
  }, [aberto]);

  return (
    <div ref={raizRef} className={estilos.raiz}>
      <button
        ref={gatilhoRef}
        type="button"
        className={estilos.gatilho}
        aria-label={rotulo}
        aria-expanded={aberto}
        onClick={() => setAberto((atual) => !atual)}
      >
        <Ellipsis size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>

      {aberto && (
        <ul className={estilos.menu}>
          {itens.map((item) => (
            <li key={item.rotulo}>
              <button
                type="button"
                className={item.perigo ? `${estilos.item} ${estilos.perigo}` : estilos.item}
                onClick={() => {
                  setAberto(false);
                  item.aoSelecionar();
                }}
              >
                {item.rotulo}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
