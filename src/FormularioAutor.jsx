import { useState, useEffect } from 'react';
import api from './api/api';
import { useNavigate, useParams } from 'react-router-dom';

function FormularioAutor() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      carregarDados();
    }
  }, [id]);

  const carregarDados = async () => {
    const locais = JSON.parse(localStorage.getItem('novosAutores') || '[]');
    const autorLocal = locais.find(a => a.id == id);

    if (autorLocal) {
      setNome(autorLocal.first_name + ' ' + autorLocal.last_name);
      setCargo(autorLocal.job);
    } else {
      try {
        const res = await api.get(`/users/${id}`);
        setNome(res.data.data.first_name + ' ' + res.data.data.last_name);
        setCargo("Escritor(a)"); 
      } catch (err) {
        navigate('/autores');
      }
    }
  };

  const salvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const nomes = nome.split(' ');
    const firstName = nomes[0];
    const lastName = nomes.slice(1).join(' ') || '';

    const novoObjeto = {
      id: id ? Number(id) : Date.now(),
      first_name: firstName,
      last_name: lastName,
      email: cargo, 
      job: cargo,
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=10b981&color=fff`
    };

    try {
      try {
        if (id && Number(id) < 10000) { 
          await api.put(`/users/${id}`, { name: nome, job: cargo });
        } else if (!id) {
          await api.post('/users', { name: nome, job: cargo });
        }
      } catch (apiError) {
        console.warn("API offline ou lenta. Salvando apenas localmente.");
      }

      const locais = JSON.parse(localStorage.getItem('novosAutores') || '[]');
      
      if (id) {
        const index = locais.findIndex(a => a.id == id);
        if (index !== -1) {
          locais[index] = novoObjeto;
          localStorage.setItem('novosAutores', JSON.stringify(locais));
        } else {
          localStorage.setItem('novosAutores', JSON.stringify([...locais, novoObjeto]));
        }
        alert("Cadastro atualizado com sucesso!");
      } else {
        localStorage.setItem('novosAutores', JSON.stringify([...locais, novoObjeto]));
        alert("Novo autor cadastrado com sucesso!");
      }

      // Redireciona
      navigate('/autores');

    } catch (error) {
      alert("Erro inesperado no sistema.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="card" style={{width: '100%', maxWidth: '500px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '30px'}}>
          {id ? 'Editar Autor' : 'Novo Cadastro'}
        </h2>
        
        <form onSubmit={salvar}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              required 
              placeholder="Ex: Clarice Lispector"
            />
          </div>

          <div className="form-group">
            <label>Cargo / Função</label>
            <input 
              value={cargo} 
              onChange={e => setCargo(e.target.value)} 
              required 
              placeholder="Ex: Romancista"
            />
          </div>

          <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => navigate('/autores')}
              style={{flex: 1}}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{flex: 1}}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioAutor;