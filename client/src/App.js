import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CadastroUsuario from './pages/usuarios/CadastroUsuario';
import CadastrarPerfil from './pages/perfil/CadastroPerfil';
import CasdastroTurma from './pages/turmas/CadastroTurma';
import GerenciarTrumas from './pages/turmas/GerenciarTurmas';
import ListarTurmas from './pages/turmas/ListarTurmas';
import EditarTurma from './pages/turmas/EditarTurma';
import GerenciarUsuarios from './pages/usuarios/GerenciarUsuarios';
import ListarUsuario from './pages/usuarios/listarUsuario';

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
          <Route path='/gerenciar-usuarios' element={<GerenciarUsuarios/>} />
          <Route path='/listar-turmas' element={<ListarTurmas />} />
          <Route path='/editar-turma/:id' element={<EditarTurma />} />
          <Route path='/listar-usuarios' element={<ListarUsuario/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
