import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { CampoSenha } from '../components/auth/CampoSenha';
import formulario from '../components/auth/formulario.module.css';
import { Botao } from '../components/ui/Botao';
import { Campo } from '../components/ui/Campo';
import { classeControle } from '../components/ui/classeControle';
import controles from '../components/ui/controles.module.css';
import { authService } from '../services/authService';
import { statusDoErro } from '../utils/erros';
import { emailValido, TAMANHO_MINIMO_SENHA } from '../utils/validacao';

interface Valores {
  nome: string;
  email: string;
  senha: string;
  confirmacao: string;
}

type Erros = Partial<Record<keyof Valores, string>>;

function validar(valores: Valores): Erros {
  const erros: Erros = {};
  if (!valores.nome.trim()) erros.nome = 'Informe seu nome completo.';
  if (!valores.email.trim()) erros.email = 'Informe seu e-mail.';
  else if (!emailValido(valores.email)) erros.email = 'Informe um e-mail válido.';
  if (!valores.senha) erros.senha = 'Crie uma senha.';
  else if (valores.senha.length < TAMANHO_MINIMO_SENHA) {
    erros.senha = `A senha deve ter pelo menos ${TAMANHO_MINIMO_SENHA} caracteres.`;
  }
  if (!valores.confirmacao) erros.confirmacao = 'Confirme sua senha.';
  else if (valores.confirmacao !== valores.senha) erros.confirmacao = 'As senhas não coincidem.';
  return erros;
}

export function CadastroPage() {
  const navigate = useNavigate();
  const [valores, setValores] = useState<Valores>({ nome: '', email: '', senha: '', confirmacao: '' });
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
      await authService.cadastrar({
        nome: valores.nome.trim(),
        email: valores.email.trim(),
        senha: valores.senha,
      });
      navigate('/entrar');
    } catch (erro) {
      setErroEnvio(
        statusDoErro(erro) === 409
          ? 'Este e-mail já está cadastrado.'
          : 'Não foi possível criar a conta. Tente novamente.',
      );
      setEnviando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Crie sua conta"
      subtitulo="Comece a organizar sua rotina de estudos de forma simples e eficiente."
      alternativa={
        <>
          Já possui uma conta?{' '}
          <Link to="/entrar" className={formulario.link}>
            Entrar
          </Link>
        </>
      }
    >
      <form className={formulario.formulario} onSubmit={aoEnviar} noValidate>
        <Campo rotulo="Nome completo" grande erro={erros.nome}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              className={classeControle(Boolean(erros.nome), controles.alto)}
              placeholder="Digite seu nome completo"
              value={valores.nome}
              onChange={(e) => alterar('nome', e.target.value)}
            />
          )}
        </Campo>

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
              autoComplete="new-password"
              invalido={Boolean(erros.senha)}
              placeholder="Crie uma senha"
              value={valores.senha}
              onChange={(e) => alterar('senha', e.target.value)}
            />
          )}
        </Campo>

        <Campo
          rotulo="Confirmar senha"
          grande
          erro={erros.confirmacao}
          ajuda={`Use pelo menos ${TAMANHO_MINIMO_SENHA} caracteres.`}
        >
          {(props) => (
            <CampoSenha
              {...props}
              autoComplete="new-password"
              invalido={Boolean(erros.confirmacao)}
              placeholder="Digite a senha novamente"
              value={valores.confirmacao}
              onChange={(e) => alterar('confirmacao', e.target.value)}
            />
          )}
        </Campo>

        {erroEnvio && (
          <p className={formulario.erroEnvio} role="alert">
            {erroEnvio}
          </p>
        )}

        <Botao type="submit" className={formulario.enviar} disabled={enviando}>
          {enviando ? 'Criando conta...' : 'Criar conta'}
        </Botao>
      </form>
    </AuthLayout>
  );
}
