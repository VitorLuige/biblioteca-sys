import { useState, useEffect } from 'react';
import api from './api/api';
import { Link, useSearchParams } from 'react-router-dom';

function ListaAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filtro = searchParams.get('busca') || "";

  useEffect(() => {
    carregarAutores();
  }, []);

  const carregarAutores = async () => {
    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        api.get('/users?page=1'),
        api.get('/users?page=2')
      ]);
      const apiData = [...res1.data.data, ...res2.data.data];
      
      const localData = JSON.parse(localStorage.getItem('novosAutores') || '[]');
      
      const deletados = JSON.parse(localStorage.getItem('autoresRemovidos') || '[]');

      const mapaUnico = new Map();
      apiData.forEach(item => mapaUnico.set(item.id, item));
      localData.forEach(item => mapaUnico.set(item.id, item));

      const todos = Array.from(mapaUnico.values()).filter(a => !deletados.includes(a.id));
      
      setAutores(todos);
    } catch (error) {
      const localData = JSON.parse(localStorage.getItem('novosAutores') || '[]');
      setAutores(localData);
    } finally {
      setLoading(false);
    }
  };

  const deletarAutor = async (id) => {
    if (!confirm("Tem certeza que deseja remover este cadastro?")) return;

    try {
      const locais = JSON.parse(localStorage.getItem('novosAutores') || '[]');
      const ehLocal = locais.some(a => a.id === id);

      if (ehLocal) {
        const novaLista = locais.filter(a => a.id !== id);
        localStorage.setItem('novosAutores', JSON.stringify(novaLista));
      } else {
        try { await api.delete(`/users/${id}`); } catch (e) { console.warn('API não respondeu, forçando deleção local'); }
        
        const deletados = JSON.parse(localStorage.getItem('autoresRemovidos') || '[]');
        localStorage.setItem('autoresRemovidos', JSON.stringify([...deletados, id]));
      }

      setAutores(autores.filter(a => a.id !== id));
      alert("Autor removido com sucesso!");

    } catch (e) {
      alert("Erro ao processar exclusão.");
    }
  };

  const autoresFiltrados = autores.filter(a => 
    a.first_name.toLowerCase().includes(filtro.toLowerCase()) || 
    (a.last_name && a.last_name.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '10px'}}>
        <div>
          <h2>Autores & Colaboradores</h2>
          <p style={{color: 'var(--text-muted)', marginTop: '5px'}}>Gerencie o quadro de escritores.</p>
        </div>
        <input 
          type="text" 
          placeholder="🔍 Buscar autor..." 
          value={filtro}
          onChange={(e) => setSearchParams({ busca: e.target.value })}
          style={{maxWidth: '300px'}}
        />
      </div>

      {loading ? (
        <div className="loading">Atualizando catálogo...</div>
      ) : (
        <div className="grid-autores">
          {autoresFiltrados.length === 0 && <p style={{gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)'}}>Nenhum registro encontrado.</p>}
          
          {autoresFiltrados.map(autor => (
            <div key={autor.id} className="autor-card">
              <img src={autor.avatar} alt={autor.first_name} className="autor-img" />
              <div>
                <h3 style={{margin: '0 0 5px 0'}}>{autor.first_name} {autor.last_name}</h3>
                <span className="badge">{autor.email || autor.job || 'Escritor'}</span>
              </div>
              
              <div style={{display: 'flex', gap: '10px', marginTop: '10px', width: '100%'}}>
                <Link to={`/editar/${autor.id}`} style={{flex: 1}}>
                  <button className="btn-outline" style={{width: '100%'}}>Editar</button>
                </Link>
                <button 
                  onClick={() => deletarAutor(autor.id)} 
                  className="btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaAutores;