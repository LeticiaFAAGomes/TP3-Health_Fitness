package br.edu.infnet.ms_gestao_alunos.aluno;


import br.edu.infnet.ms_gestao_alunos.models.Aluno;
import br.edu.infnet.ms_gestao_alunos.repositories.AlunoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class AlunoTest {
    @Autowired
    private AlunoRepository repository;

    @Test
    @DisplayName("Deve salvar um aluno")
    void deveSalvarAlunoQuandoDadosForemValidos() {

        Aluno aluno = new Aluno(
                "João Silva",
                new Date(),
                "joao@email.com",
                "(21)99999-9999"
        );

        Aluno salvo = repository.save(aluno);

        assertNotNull(salvo.getId());
        assertEquals("João Silva", salvo.getNome());
        assertEquals("joao@email.com", salvo.getEmail());
    }

    @Test
    @DisplayName("Deve buscar aluno por ID")
    void deveBuscarAlunoPorIdQuandoAlunoExistir() {

        Aluno aluno = repository.save(
                new Aluno(
                        "Joana",
                        new Date(),
                        "joana@email.com",
                        "(00)88888-8888"
                )
        );

        Optional<Aluno> resultado = repository.findById(aluno.getId());

        assertTrue(resultado.isPresent());
        assertEquals("Joana", resultado.get().getNome());
    }

    @Test
    @DisplayName("Deve listar todos os alunos")
    void deveListarTodosAlunosQuandoAlunosExistem() {

        repository.save(
                new Aluno(
                        "Roberta",
                        new Date(),
                        "roberta@email.com",
                        "1111-1111"
                )
        );

        repository.save(
                new Aluno(
                        "Ana",
                        new Date(),
                        "ana@email.com",
                        "2222-2222"
                )
        );

        List<Aluno> alunos = repository.findAll();

        assertEquals(2, alunos.size());
    }

    @Test
    @DisplayName("Deve atualizar um aluno")
    void deveAtualizarAlunoQuandoAlunoExistir() {

        Aluno aluno = repository.save(
                new Aluno(
                        "Lucio",
                        new Date(),
                        "lucio@email.com",
                        "3333-3333"
                )
        );

        aluno.setTelefone("(00)77777-7777");

        repository.save(aluno);

        Aluno atualizado = repository.findById(aluno.getId()).orElseThrow();

        assertEquals("(00)77777-7777", atualizado.getTelefone());
    }

    @Test
    @DisplayName("Deve remover um aluno")
    void deveExcluirAlunoQuandoAlunoExistir() {

        Aluno aluno = repository.save(
                new Aluno(
                        "Lucas",
                        new Date(),
                        "lucas@email.com",
                        "4444-4444"
                )
        );

        repository.delete(aluno);

        Optional<Aluno> resultado = repository.findById(aluno.getId());

        assertFalse(resultado.isPresent());
    }
}
