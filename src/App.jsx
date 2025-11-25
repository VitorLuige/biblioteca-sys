import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import ListaAutores from './ListaAutores';
import FormularioAutor from './FormularioAutor';

// Componente de Navegação isolado
function NavBar() {
  const location = useLocation();
  const getClasse = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <header>
      <div className="logo">Biblioteca<span style={{color: 'white'}}>Sys</span></div>
      <nav>
        <Link to="/" className={getClasse('/')}>Dashboard</Link>
        <Link to="/autores" className={getClasse('/autores')}>Autores</Link>
        <Link to="/novo" className={getClasse('/novo')}>+ Novo Cadastro</Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/autores" element={<ListaAutores />} />
          <Route path="/novo" element={<FormularioAutor />} />
          <Route path="/editar/:id" element={<FormularioAutor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;