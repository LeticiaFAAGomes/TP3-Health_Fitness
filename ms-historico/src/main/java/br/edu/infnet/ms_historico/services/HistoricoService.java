package br.edu.infnet.ms_historico.services;


import br.edu.infnet.ms_historico.models.Historico;
import br.edu.infnet.ms_historico.repositories.HistoricoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoricoService {

    @Autowired
    private HistoricoRepository repository;

    public List<Historico> encontrarAluno(Long alunoId) {
        return repository.findByAlunoId(alunoId);
    }

    public void registrar(Long alunoId, String descricao) {

        Historico historico = new Historico();

        historico.setAlunoId(alunoId);
        historico.setDescricao(descricao);
        historico.setData(LocalDateTime.now());

        repository.save(historico);
    }
}