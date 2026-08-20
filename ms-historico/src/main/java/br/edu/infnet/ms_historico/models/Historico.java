package br.edu.infnet.ms_historico.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "historico")
@Data
public class Historico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aluno_id", nullable = false)
    private Long alunoId;

    @Column(nullable = false)
    private String descricao;

    @Column(name = "data", nullable = false)
    private LocalDateTime data;
}
