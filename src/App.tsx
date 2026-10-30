import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CalendarioPage } from './pages/CalendarioPage';
import { CadastroPage } from './pages/CadastroPage';
import { LoginPage } from './pages/LoginPage';
import { MateriasPage } from './pages/MateriasPage';
import { TarefasPage } from './pages/TarefasPage';
import { VisaoGeralPage } from './pages/VisaoGeralPage';
import { NaoEncontradaPage } from './pages/NaoEncontradaPage';

export default function App() {
  return (
    <Routes>
      <Route path="entrar" element={<LoginPage />} />
      <Route path="cadastro" element={<CadastroPage />} />
      <Route element={<Layout />}>
        <Route index element={<VisaoGeralPage />} />
        <Route path="materias" element={<MateriasPage />} />
        <Route path="tarefas" element={<TarefasPage />} />
        <Route path="calendario" element={<CalendarioPage />} />
        <Route path="*" element={<NaoEncontradaPage />} />
      </Route>
    </Routes>
  );
}
