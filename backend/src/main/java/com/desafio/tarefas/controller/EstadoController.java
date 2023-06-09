package com.desafio.tarefas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.tarefas.model.Estado;
import com.desafio.tarefas.service.EstadoService;


@RestController
@RequestMapping("/estados")
public class EstadoController {
    
    @Autowired
    private EstadoService estadoService;

    @GetMapping("/validos")
    public List<Estado> getEstadosSemArquivado() {
        return estadoService.estadoSemArquivado();
    }
}
