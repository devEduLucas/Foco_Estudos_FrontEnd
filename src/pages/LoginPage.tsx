import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { CampoSenha } from '../components/auth/CampoSenha';
import formulario from '../components/auth/formulario.module.css';
import { Botao } from '../components/ui/Botao';
import { Campo } from '../components/ui/Campo';
import { classeControle } from '../components/ui/classeControle';
import controles from '../components/ui/controles.module.css';
import { authService } from '../services/authService';
import { statusDoErro } from '../utils/erros';
import { emailValido } from '../utils/validacao';

interface Valores {
  email: string;
  senha: string;
}

type Erros = Partial<Record<keyof Valores, string>>;

function validar(valores: Valores): Erros {
  const erros: Erros = {};
  if (!valores.email.trim()) erros.email = 'Informe seu e-mail.';
  else if (!emailValido(valores.email)) erros.email = 'Informe um e-mail válido.';
  if (!valores.senha) erros.senha = 'Informe sua senha.';
  return erros;
}

export function LoginPage() {
  const navigate = useNavigate();
  const origem = (useLocation().state as { origem?: string } | null)?.origem ?? '/';
  const [valores, setValores] = useState<Valores>({ email: '', senha: '' });
  const [erros, setErros] = useState<Erros>({});
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  function alterar(campo: keyof Valores, valor: string) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const novosErros = validar(valores);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    setErroEnvio(null);

    try {
      await authService.entrar({ email: valores.email.trim(), senha: valores.senha });
      navigate(origem, { replace: true });
    } catch (erro) {
      setErroEnvio(
        statusDoErro(erro) === 401
          ? 'E-mail ou senha incorretos.'
          : 'Não foi possível entrar. Tente novamente.',
      );
      setEnviando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Entre na sua conta"
      subtitulo="Acesse seu espaço para continuar organizando seus estudos."
      alternativa={
        <>
          Ainda não possui uma conta?{' '}
          <Link to="/cadastro" className={formulario.link}>
            Criar conta
          </Link>
        </>
      }
    >
      <form className={formulario.formulario} onSubmit={aoEnviar} noValidate>
        <Campo rotulo="E-mail" grande erro={erros.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              className={classeControle(Boolean(erros.email), controles.alto)}
              placeholder="seuemail@exemplo.com"
              value={valores.email}
              onChange={(e) => alterar('email', e.target.value)}
            />
          )}
        </Campo>

        <Campo rotulo="Senha" grande erro={erros.senha}>
          {(props) => (
            <CampoSenha
              {...props}
              autoComplete="current-password"
              invalido={Boolean(erros.senha)}
              placeholder="Digite sua senha"
              value={valores.senha}
              onChange={(e) => alterar('senha', e.target.value)}
            />
          )}
        </Campo>

        {erroEnvio && (
          <p className={formulario.erroEnvio} role="alert">
            {erroEnvio}
          </p>
        )}

        <Botao type="submit" className={formulario.enviar} disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </Botao>
      </form>
    </AuthLayout>
  );
}
