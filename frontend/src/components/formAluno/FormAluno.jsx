import React from "react";

function FormAluno({ modoEdicao, id, nome, dataNascimento, email, telefone, setId, setNome, setDataNascimento, setEmail, setTelefone, cadastrar, atualizar, limparFormulario }) {
  return (
    <div className='card form-section'>
      <div className='card-header'>
        <h3>{modoEdicao ? "Editar Aluno" : "Novo Aluno"}</h3>
      </div>

      {!modoEdicao && <input type='number' className='input-hidden' placeholder='ID' value={id} onChange={(e) => setId(e.target.value)} />}

      <div className='form-grid'>
        <div className='form-group'>
          <label htmlFor='nome'>Nome</label>
          <input id='nome' type='text' className='form-input' placeholder='Digite o nome completo' value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='dataNascimento'>Data de Nascimento</label>
          <input id='dataNascimento' type='date' className='form-input' value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>E-mail</label>
          <input id='email' type='text' className='form-input' placeholder='exemplo@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='telefone'>Telefone</label>
          <input id='telefone' type='text' className='form-input' placeholder='(00) 00000-0000' value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
      </div>

      <div className='button-group'>
        <button onClick={modoEdicao ? atualizar : cadastrar} className='btn btn-primary'>
          {modoEdicao ? "Salvar Alterações" : "Cadastrar Aluno"}
        </button>

        {modoEdicao && (
          <button onClick={limparFormulario} className='btn btn-secondary'>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default FormAluno;
