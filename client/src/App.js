import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CadastroUsuario from './pages/CadastroUsuario';

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/cadastro' element={<CadastroUsuario />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
