package br.edu.infnet.ms_gestao_alunos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-historico")
public interface HistoricoClient {

    @PostMapping("/historico")
    public void registrar(@RequestBody HistoricoRequest request);

    record HistoricoRequest(Long alunoId, String descricao) {}
}
