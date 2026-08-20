const API_URL = "http://localhost:8080";

export const historicoService = {
  getByAlunoId: (alunoId) => {
    return fetch(`${API_URL}/historico/${alunoId}`).then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar histórico");
      }
      return response.json();
    });
  },
};
