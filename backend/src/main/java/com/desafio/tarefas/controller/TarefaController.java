package com.desafio.tarefas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.tarefas.model.Tarefa;
import com.desafio.tarefas.model.dto.TarefaDTO;
import com.desafio.tarefas.model.dto.TarefaEstadoDTO;
import com.desafio.tarefas.service.TarefaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    
    @Autowired
    private TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<?> createTarefa(@RequestBody @Valid TarefaDTO tarefaDTO) {
        return tarefaService.createTarefa(tarefaDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> updateTarefa(@PathVariable(value = "id") Integer id, @RequestBody @Valid TarefaEstadoDTO tarefaEstadoDTO) {
        return tarefaService.updateTarefa(id, tarefaEstadoDTO);
    }

    
}
