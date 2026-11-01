import { createContext } from 'react';
import type { Tema } from './tema';

export interface ContextoTema {
  tema: Tema;
  alternar: () => void;
}

export const ContextoTema = createContext<ContextoTema | null>(null);
