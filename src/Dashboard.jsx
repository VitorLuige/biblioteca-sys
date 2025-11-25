import { useEffect, useState } from 'react';
import api from './api/api';

function Dashboard() {
  const [totalAutores, setTotalAutores] = useState(0);

  useEffect(() => {
    api.get('/users').then(res => {
      setTotalAutores(res.data.total);
    });
  }, []);

  return (
    <div>
      <h2 style={{marginBottom: '20px'}}>Painel da Editora</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
        <div className="card">
          <span className="badge">Base de Dados</span>
          <h1 style={{fontSize: '3rem', margin: '10px 0', color: 'var(--primary)'}}>
            {totalAutores}
          </h1>
          <p style={{color: 'var(--text-muted)', margin: 0}}>Autores Contratados</p>
        </div>

        <div className="card">
          <span className="badge">Status do Sistema</span>
          <h3 style={{marginTop: '20px'}}>Operacional 🟢</h3>
          <p style={{color: 'var(--text-muted)'}}>API ReqRes conectada</p>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h3>📌 Avisos Rápidos</h3>
        <p style={{color: 'var(--text-muted)'}}>
          O sistema está operando em modo de teste. 
          As alterações de cadastro (POST/PUT/DELETE) são simuladas pela API.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;