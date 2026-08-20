package br.edu.infnet.ms_gestao_alunos.services;



import br.edu.infnet.ms_gestao_alunos.client.HistoricoClient;
import br.edu.infnet.ms_gestao_alunos.models.Aluno;
import br.edu.infnet.ms_gestao_alunos.repositories.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    @Autowired
    private AlunoRepository repository;
    @Autowired
    private HistoricoClient historicoClient;

    public Aluno salvar(Aluno aluno) {

        repository.save(aluno);

        historicoClient.registrar(new HistoricoClient.HistoricoRequest(aluno.getId(), "Aluno cadastrado"));

        return aluno;
    }

    public List<Aluno> listar() {
        return repository.findAll();
    }

    public Aluno buscarPorId(Long id) {

        return repository.findById(id).orElse(null);
    }

    public Aluno atualizar(Long id, Aluno aluno) {
        Aluno alunoAtualizar = buscarPorId(id);

        alunoAtualizar.setNome(aluno.getNome());
        alunoAtualizar.setDataNascimento(aluno.getDataNascimento());
        alunoAtualizar.setEmail(aluno.getEmail());
        alunoAtualizar.setTelefone(aluno.getTelefone());

        repository.save(alunoAtualizar);

        historicoClient.registrar(
                new HistoricoClient.HistoricoRequest(id, "Cadastro de aluno atualizado.")
        );

        return alunoAtualizar;
    }

    public Aluno deletar(Long id) {
        Aluno alunoDeletado = buscarPorId(id);
        repository.deleteById(id);
        historicoClient.registrar(
                new HistoricoClient.HistoricoRequest(id, "Cadastro de aluno deletado.")
        );
       return alunoDeletado;
    }

}
