import { useEffect, useRef, useState } from 'react';

/** Indica quando o elemento entra na viewport (uma única vez), sem handlers de scroll. */
export function useRevelar<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    if (!('IntersectionObserver' in window)) {
      setVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisivel(true);
        observador.disconnect();
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return { ref, visivel };
}
