import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastrarPerfil from './pages/CadastroPerfil';
import CasdastroTurma from './pages/turmas/CadastroTurma';
import GerenciarTrumas from './pages/turmas/GerenciarTurmas';
import ListarTurmas from './pages/turmas/ListarTurmas';
import EditarTurma from './pages/turmas/EditarTurma';

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/cadastro' element={<CadastroUsuario />} />
          <Route path='/cadastro-perfil' element={<CadastrarPerfil />} />
          <Route path='/cadastro-turma' element={<CasdastroTurma />} />
          <Route path='/gerenciar-turma' element={<GerenciarTrumas />} />
          <Route path='/listar-turmas' element={<ListarTurmas />} />
          <Route path='/editar-turma/:id' element={<EditarTurma />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
