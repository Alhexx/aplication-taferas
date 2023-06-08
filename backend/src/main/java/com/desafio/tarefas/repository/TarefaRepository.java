package com.desafio.tarefas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.desafio.tarefas.model.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {

    public Optional<Tarefa> findByTitulo(String titulo);

    @Query("SELECT t FROM Tarefa t WHERE t.usuario.id = :usuarioId AND t.estado.estado != 'Arquivada'")
    List<Tarefa> findByUsuarioId(Integer usuarioId);
    
}
