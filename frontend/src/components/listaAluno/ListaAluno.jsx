import React, { useEffect, useState } from "react";
import { historicoService } from "../../services/historicoService";

function ListaAluno({ alunos, editar, deletar }) {
  const [historicos, setHistoricos] = useState({});

  useEffect(() => {
    alunos.forEach((aluno) => {
      historicoService
        .getByAlunoId(aluno.id)
        .then((dados) => {
          setHistoricos((prev) => ({ ...prev, [aluno.id]: dados }));
        })
        .catch(() => {
          setHistoricos((prev) => ({ ...prev, [aluno.id]: [] }));
        });
    });
  }, [alunos]);

  return (
    <div className='card table-section'>
      <div className='card-header'>
        <h3>Lista de Alunos</h3>
      </div>

      {alunos.length === 0 ? (
        <div className='no-data'>
          <span className='no-data-icon'>📭</span>
          <p>Nenhum aluno encontrado na lista.</p>
        </div>
      ) : (
        <div className='table-responsive'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Nascimento</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Histórico</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, index) => (
                <tr key={aluno.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                  <td>{aluno.id}</td>
                  <td className='name-cell'>{aluno.nome}</td>
                  <td>{aluno.dataNascimento ? aluno.dataNascimento.split("T")[0] : "-"}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.telefone}</td>
                  <td className='historico-cell'>
                    {!historicos[aluno.id] ? (
                      <span>Carregando...</span>
                    ) : historicos[aluno.id].length === 0 ? (
                      <span>Sem registros</span>
                    ) : (
                      <ul className='historico-list'>
                        {historicos[aluno.id].map((h) => (
                          <li key={h.id}>
                            <strong>{new Date(h.data).toLocaleDateString("pt-BR")}</strong> — {h.descricao}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className='actions-cell'>
                    <button onClick={() => editar(aluno)} className='btn btn-sm btn-warning' title='Editar'>
                      Editar
                    </button>
                    <button onClick={() => deletar(aluno.id)} className='btn btn-sm btn-danger' title='Deletar'>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaAluno;
