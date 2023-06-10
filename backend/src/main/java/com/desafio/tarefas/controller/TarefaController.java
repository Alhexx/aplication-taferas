package com.desafio.tarefas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.tarefas.model.Tarefa;
import com.desafio.tarefas.model.dto.TarefaDTO;
import com.desafio.tarefas.model.dto.TarefaEstadoDTO;
import com.desafio.tarefas.model.dto.TarefaUpdateDTO;
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

    @PutMapping("/estado/{id}")
    public ResponseEntity<?> updateTarefaEstado(@PathVariable(value = "id") Integer id, @RequestBody @Valid TarefaEstadoDTO tarefaEstadoDTO) {
        return tarefaService.updateTarefaEstado(id, tarefaEstadoDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTarefa(@PathVariable(value = "id") Integer id, @RequestBody @Valid TarefaUpdateDTO tarefaUpdateDTO) {
        return tarefaService.updateTarefa(id, tarefaUpdateDTO);
    }

    @PostMapping("/des-arquivar/{id}")
    public ResponseEntity<?> arquivarTarefa(@PathVariable(value = "id") Integer id) {
        return tarefaService.arquivarTarefa(id);
    }

    @GetMapping("/usuario/{id}")
    public List<Tarefa> getTarefasByUsuario(@PathVariable("id") Integer usuarioId) {
        return tarefaService.tarefaPorUsuario(usuarioId);
    }

    @GetMapping("/arquivadas/usuario/{id}")
    public List<Tarefa> getTarefasArquivadasByUsuario(@PathVariable("id") Integer usuarioId) {
        return tarefaService.tarefaArquivadaPorUsuario(usuarioId);
    }
}
