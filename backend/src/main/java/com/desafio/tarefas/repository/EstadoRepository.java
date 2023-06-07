package com.desafio.tarefas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.tarefas.model.Estado;
import java.util.Optional;


@Repository
public interface EstadoRepository extends JpaRepository<Estado, Integer> {
    public Optional<Estado> findByEstado(String estado);
}
