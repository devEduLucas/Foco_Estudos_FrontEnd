import { CabecalhoPagina } from '../components/ui/CabecalhoPagina';

interface EmBrevePageProps {
  titulo: string;
}

export function EmBrevePage({ titulo }: EmBrevePageProps) {
  return <CabecalhoPagina titulo={titulo} subtitulo="Esta página será implementada na próxima etapa." />;
}
