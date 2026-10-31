import { TAMANHO_MINIMO_SENHA } from '../../utils/validacao';
import estilos from './ForcaSenha.module.css';

const ROTULOS = ['Muito fraca', 'Fraca', 'Média', 'Boa', 'Forte'];

function pontuar(senha: string): number {
  if (!senha) return 0;
  return [
    senha.length >= TAMANHO_MINIMO_SENHA,
    /[a-z]/.test(senha) && /[A-Z]/.test(senha),
    /\d/.test(senha),
    /[^A-Za-z0-9]/.test(senha),
  ].filter(Boolean).length;
}

export function ForcaSenha({ senha }: { senha: string }) {
  const pontos = pontuar(senha);

  return (
    <div className={estilos.forca} data-nivel={pontos}>
      <div className={estilos.cabecalho}>
        <span>Força da senha</span>
        <span className={estilos.rotulo} aria-live="polite">
          {ROTULOS[pontos]}
        </span>
      </div>
      <div className={estilos.barras} aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={n <= pontos ? `${estilos.barra} ${estilos.ativa}` : estilos.barra} />
        ))}
      </div>
      <p className={estilos.dica}>Use 8+ caracteres, maiúscula, número e símbolo.</p>
    </div>
  );
}
