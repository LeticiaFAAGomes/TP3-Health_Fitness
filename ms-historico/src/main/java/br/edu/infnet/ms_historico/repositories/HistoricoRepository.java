package br.edu.infnet.ms_historico.repositories;

import br.edu.infnet.ms_historico.models.Historico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    List<Historico> findByAlunoId(Long alunoId);
}
