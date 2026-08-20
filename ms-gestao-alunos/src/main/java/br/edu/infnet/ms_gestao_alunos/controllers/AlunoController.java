package br.edu.infnet.ms_gestao_alunos.controllers;

import br.edu.infnet.ms_gestao_alunos.models.Aluno;
import br.edu.infnet.ms_gestao_alunos.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService service;

    @PostMapping
    public Aluno salvar(@RequestBody Aluno aluno) {

        return service.salvar(aluno);
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        Aluno aluno = service.buscarPorId(id);

        if (aluno == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aluno);
    }

    @PutMapping("{id}")
    public Aluno atualizar(@PathVariable Long id, @RequestBody Aluno aluno) {
        return  service.atualizar(id, aluno);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Aluno> deletar(@PathVariable Long id) {
        return ResponseEntity.ok(service.deletar(id));
    }

}
