import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastrarPerfil from './pages/CadastroPerfil';

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/cadastro' element={<CadastroUsuario />} />
          <Route path='/cadastro-perfil' element={<CadastrarPerfil/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
