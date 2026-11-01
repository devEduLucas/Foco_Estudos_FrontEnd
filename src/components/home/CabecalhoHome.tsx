import { useEffect, useRef, useState } from 'react';
import { AlternarTema } from '../ui/AlternarTema';
import { BotaoCta } from './BotaoCta';
import estilos from './Home.module.css';

const LINKS = [
  { href: '#recursos', rotulo: 'Recursos' },
  { href: '#como-funciona', rotulo: 'Como funciona' },
  { href: '#duvidas', rotulo: 'Dúvidas' },
];

export function CabecalhoHome() {
  const sentinelaRef = useRef<HTMLDivElement>(null);
  const [rolado, setRolado] = useState(false);

  // Observa uma sentinela no topo da página em vez de escutar eventos de scroll.
  useEffect(() => {
    const sentinela = sentinelaRef.current;
    if (!sentinela || !('IntersectionObserver' in window)) return;
    const observador = new IntersectionObserver(([entrada]) => setRolado(!entrada.isIntersecting));
    observador.observe(sentinela);
    return () => observador.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelaRef} className={estilos.sentinela} aria-hidden="true" />
      <header className={rolado ? `${estilos.cabecalho} ${estilos.rolado}` : estilos.cabecalho}>
        <div className={`${estilos.container} ${estilos.cabecalhoInterno}`}>
          <a href="#topo" className={estilos.marca} aria-label="FocoEstudos — início">
            <span className={estilos.logo} aria-hidden="true">
              F
            </span>
            <span className={estilos.nomeMarca}>FocoEstudos</span>
          </a>

          <nav className={estilos.navegacao} aria-label="Seções da página">
            {LINKS.map(({ href, rotulo }) => (
              <a key={href} href={href} className={estilos.linkNavegacao}>
                {rotulo}
              </a>
            ))}
          </nav>

          <div className={estilos.acoesCabecalho}>
            <AlternarTema />
            <BotaoCta to="/entrar" variante="secundario">
              Entrar
            </BotaoCta>
            <BotaoCta to="/cadastro">Criar conta</BotaoCta>
          </div>
        </div>
      </header>
    </>
  );
}
