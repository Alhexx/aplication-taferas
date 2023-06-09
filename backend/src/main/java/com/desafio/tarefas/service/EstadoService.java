package com.desafio.tarefas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafio.tarefas.model.Estado;
import com.desafio.tarefas.model.enums.EnumEstados;
import com.desafio.tarefas.repository.EstadoRepository;

@Service
public class EstadoService {
    @Autowired
    private EstadoRepository estadoRepository;

    public void loadEnumData() {
        for (EnumEstados e : EnumEstados.values()) {
            Estado estado = new Estado();
            estado.setId(e.ordinal());
            estado.setEstado(e.getLabel());
            estadoRepository.save(estado);
        }
    }

    public List<Estado> estadoSemArquivado() {
        return estadoRepository.findAllSemArquivado();
    }
}
