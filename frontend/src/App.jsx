import React, { useState, useEffect } from "react";
import "./App.css";
import { alunoService } from "./services/api";

import Header from "./components/header/Header";
import FormAluno from "./components/formAluno/FormAluno";
import SearchBar from "./components/searchBar/SearchBar";
import ListaAluno from "./components/listaAluno/ListaAluno";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [idBusca, setIdBusca] = useState("");

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  const buscarAlunos = async () => {
    try {
      const data = await alunoService.getAll();
      setAlunos(data);
      setIdBusca("");
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      alert("Falha ao carregar a lista.");
    }
  };

  const buscarPorId = async (idBuscada) => {
    if (!idBuscada || idBuscada === "") {
      buscarAlunos();
      return;
    }
    try {
      const data = await alunoService.getById(idBuscada);
      setAlunos([data]);
    } catch (err) {
      console.error("Erro ao buscar por ID:", err);
      alert("Aluno não encontrado!");
      buscarAlunos();
    }
  };

  const cadastrar = async () => {
    const novoAluno = {
      nome,
      dataNascimento,
      email,
      telefone,
    };

    try {
      await alunoService.create(novoAluno);
      alert("Aluno cadastrado");
      buscarAlunos();
      limparFormulario();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao cadastrar.");
    }
  };

  const editar = (aluno) => {
    setModoEdicao(true);
    setId(aluno.id);
    setNome(aluno.nome);
    setEmail(aluno.email);
    setTelefone(aluno.telefone);

    if (aluno.dataNascimento) {
      const data = new Date(aluno.dataNascimento);
      const offset = data.getTimezoneOffset() * 60000;
      const localISOTime = new Date(data.getTime() - offset).toISOString().slice(0, 10);
      setDataNascimento(localISOTime);
    } else {
      setDataNascimento("");
    }
  };

  const atualizar = async () => {
    const alunoAtualizado = {
      id: parseInt(id),
      nome,
      dataNascimento,
      email,
      telefone,
    };

    try {
      await alunoService.update(id, alunoAtualizado);
      alert("Aluno atualizado");
      buscarAlunos();
      limparFormulario();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar.");
    }
  };

  const deletar = async (idExcluir) => {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) return;

    try {
      await alunoService.delete(idExcluir);
      alert("Aluno deletado");
      buscarAlunos();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao deletar.");
    }
  };

  const limparFormulario = () => {
    setId("");
    setNome("");
    setDataNascimento("");
    setEmail("");
    setTelefone("");
    setModoEdicao(false);
    setIdBusca("");
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  return (
    <div className='app-container'>
      <Header />

      <FormAluno
        modoEdicao={modoEdicao}
        id={id}
        nome={nome}
        dataNascimento={dataNascimento}
        email={email}
        telefone={telefone}
        setId={setId}
        setNome={setNome}
        setDataNascimento={setDataNascimento}
        setEmail={setEmail}
        setTelefone={setTelefone}
        cadastrar={cadastrar}
        atualizar={atualizar}
        limparFormulario={limparFormulario}
      />

      <SearchBar idBusca={idBusca} setIdBusca={setIdBusca} buscarPorId={buscarPorId} buscarAlunos={buscarAlunos} />

      <ListaAluno alunos={alunos} editar={editar} deletar={deletar} />
    </div>
  );
}

export default App;
