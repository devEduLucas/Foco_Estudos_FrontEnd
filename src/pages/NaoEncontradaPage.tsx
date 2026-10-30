import { CabecalhoPagina } from '../components/ui/CabecalhoPagina';
import { LinkTexto } from '../components/ui/LinkTexto';

export function NaoEncontradaPage() {
  return (
    <>
      <CabecalhoPagina titulo="Página não encontrada" subtitulo="O endereço acessado não existe." />
      <LinkTexto to="/">Voltar para a visão geral</LinkTexto>
    </>
  );
}
