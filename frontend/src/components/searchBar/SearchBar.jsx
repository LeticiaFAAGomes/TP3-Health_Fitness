import React from "react";

function SearchBar({ idBusca, setIdBusca, buscarPorId, buscarAlunos }) {
  return (
    <div className='card search-section'>
      <div className='card-header'>
        <h3>Buscar Aluno</h3>
      </div>
      <div className='search-group'>
        <input type='number' className='form-input search-input' placeholder='Digite o ID para buscar...' value={idBusca} onChange={(e) => setIdBusca(e.target.value)} />
        <div className='button-group search-buttons'>
          <button onClick={() => buscarPorId(idBusca)} className='btn btn-info'>
            Buscar
          </button>
          <button onClick={buscarAlunos} className='btn btn-secondary'>
            Ver Todos
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
