const PALAVRAS_IGNORADAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

export function iniciaisDaMateria(nome: string): string {
  const palavras = nome.trim().split(/\s+/).filter(Boolean);
  const significativas = palavras.filter((p) => !PALAVRAS_IGNORADAS.has(p.toLowerCase()));
  const base = significativas.length > 0 ? significativas : palavras;

  if (base.length === 0) return '?';
  if (base.length === 1) return base[0].slice(0, 2).toUpperCase();
  return (base[0].charAt(0) + base[1].charAt(0)).toUpperCase();
}

export function normalizarTexto(texto: string): string {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}
