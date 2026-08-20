package br.edu.infnet.ms_historico.controllers;


import br.edu.infnet.ms_historico.models.Historico;
import br.edu.infnet.ms_historico.services.HistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historico")
public class HistoricoController {

    @Autowired
    private HistoricoService historicoService;

    @GetMapping("/{alunoId}")
    public List<Historico> listarHistorico(@PathVariable Long alunoId) {
        return historicoService.encontrarAluno(alunoId);
    }

    @PostMapping
    public void registrar(@RequestBody HistoricoRequest request) {
        historicoService.registrar(request.alunoId(), request.descricao());
    }

    public record HistoricoRequest(Long alunoId, String descricao) {}

}