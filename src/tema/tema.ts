export type Tema = 'claro' | 'escuro';

export const CHAVE_TEMA = 'focoestudos.tema';
const CONSULTA_ESCURO = '(prefers-color-scheme: dark)';
const DURACAO_TRANSICAO_MS = 400;

let temporizador: number | undefined;

export function temaSalvo(): Tema | null {
  try {
    const valor = localStorage.getItem(CHAVE_TEMA);
    return valor === 'claro' || valor === 'escuro' ? valor : null;
  } catch {
    return null;
  }
}

export function salvarTema(tema: Tema): void {
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
  } catch {
    // armazenamento indisponível (modo privado): o tema vale só nesta sessão
  }
}

export function temaDoSistema(): Tema {
  return window.matchMedia?.(CONSULTA_ESCURO).matches ? 'escuro' : 'claro';
}

/** Escolha salva do usuário; na primeira visita, a preferência do sistema operacional. */
export function temaInicial(): Tema {
  return temaSalvo() ?? temaDoSistema();
}

export function observarSistema(aoMudar: () => void): () => void {
  const consulta = window.matchMedia(CONSULTA_ESCURO);
  consulta.addEventListener('change', aoMudar);
  return () => consulta.removeEventListener('change', aoMudar);
}

/** Aplica o tema na raiz do documento. Com `animar`, habilita a transição suave só durante a troca. */
export function aplicarTema(tema: Tema, animar = false): void {
  const raiz = document.documentElement;
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (animar && !semMovimento) {
    raiz.classList.add('tema-animando');
    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(() => raiz.classList.remove('tema-animando'), DURACAO_TRANSICAO_MS);
  }

  raiz.dataset.theme = tema === 'escuro' ? 'dark' : 'light';
  raiz.style.colorScheme = tema === 'escuro' ? 'dark' : 'light';
}
