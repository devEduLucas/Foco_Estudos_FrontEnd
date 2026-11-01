import { Revelar } from '../ui/Revelar';
import { BotaoCta } from './BotaoCta';
import estilos from './Home.module.css';

export function ChamadaFinal() {
  return (
    <section className={estilos.secao} aria-labelledby="titulo-chamada">
      <div className={estilos.container}>
        <Revelar>
          <div className={estilos.chamada}>
            <h2 id="titulo-chamada" className={estilos.tituloSecao}>
              Comece o semestre com tudo no lugar.
            </h2>
            <p className={estilos.leadSecao}>
              Crie sua conta e organize matérias, tarefas e prazos hoje mesmo.
            </p>
            <div className={estilos.chamadaAcoes}>
              <BotaoCta to="/cadastro" tamanho="lg" seta>
                Criar conta
              </BotaoCta>
              <BotaoCta to="/entrar" variante="secundario" tamanho="lg">
                Entrar
              </BotaoCta>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
