package br.edu.infnet.ms_gestao_alunos.repositories;

import br.edu.infnet.ms_gestao_alunos.models.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> { }
