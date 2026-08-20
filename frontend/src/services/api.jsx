const API_URL = "http://localhost:8080";

export const alunoService = {
  getAll: () => {
    return fetch(`${API_URL}/alunos`).then((response) => response.json());
  },

  getById: (id) => {
    return fetch(`${API_URL}/alunos/${id}`).then((response) => {
      if (!response.ok) {
        throw new Error("Aluno não encontrado");
      }
      return response.json();
    });
  },

  create: (aluno) => {
    return fetch(`${API_URL}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    }).then((res) => {
      if (!res.ok) throw new Error("Erro ao cadastrar");
      return res.json();
    });
  },

  update: (id, aluno) => {
    return fetch(`${API_URL}/alunos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    }).then((res) => {
      if (!res.ok) throw new Error("Erro ao atualizar");
      return res.json();
    });
  },

  delete: (id) => {
    return fetch(`${API_URL}/alunos/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("Erro ao deletar");
      return res;
    });
  },
};
