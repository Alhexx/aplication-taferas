package com.desafio.tarefas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.desafio.tarefas.model.Estado;
import com.desafio.tarefas.model.Tarefa;
import com.desafio.tarefas.model.Usuario;
import com.desafio.tarefas.model.dto.TarefaDTO;
import com.desafio.tarefas.model.dto.TarefaEstadoDTO;
import com.desafio.tarefas.model.dto.TarefaUpdateDTO;
import com.desafio.tarefas.repository.EstadoRepository;
import com.desafio.tarefas.repository.TarefaRepository;
import com.desafio.tarefas.repository.UsuarioRepository;

@Service
public class TarefaService {
    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<?> createTarefa(TarefaDTO tarefaDTO) {
        ResponseEntity<?> responseEntity;
        try {
            Optional<Tarefa> tarefaFind = tarefaRepository.findByTitulo(tarefaDTO.getTitulo());
            if(tarefaFind.isPresent()) {
                responseEntity = ResponseEntity.status(HttpStatus.CONFLICT).body("Tarefa com esse titulo já existe"); 
            } else {
                Optional<Estado> estadoFind = estadoRepository.findByEstado("Não Iniciada");
                Optional<Usuario> usuarioFind = usuarioRepository.findById(tarefaDTO.getIdUsuario());
                if(!estadoFind.isPresent()) {
                    responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estado não encontrado"); 
                } else {
                    Tarefa tarefa = new Tarefa();
                    tarefa.setTitulo(tarefaDTO.getTitulo());
                    tarefa.setDescricao(tarefaDTO.getDescricao());
                    tarefa.setEstado(estadoFind.get());
                    tarefa.setUsuario(usuarioFind.get());
                    tarefaRepository.save(tarefa);
                    responseEntity = ResponseEntity.ok(tarefa);
                }
            }
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Um erro Ocorreu");
        }
        return responseEntity;
    }

    public ResponseEntity<?> updateTarefaEstado(Integer id, TarefaEstadoDTO tarefaEstadoDTO) {
        Optional<Tarefa> tarefaFind = tarefaRepository.findById(id);
        Optional<Estado> novoEstado = estadoRepository.findById(tarefaEstadoDTO.getIdEstado());
        

        if(!tarefaFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa com o id " + id + " não existe!");
        } else {   
            Tarefa tarefa = tarefaFind.get();
            if(tarefa.getEstado().getEstado().equals("Não Iniciada")) {
                if(novoEstado.get().getEstado().equals("Em Progresso") || novoEstado.get().getEstado().equals("Finalizada")) {
                    tarefa.setEstado(novoEstado.get());    
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transição de estado inválida para a tarefa. Os estados possíveis são: Em Progresso ou Finalizada");
                }
            } else if (tarefa.getEstado().getEstado().equals("Em Progresso")) {
                if (novoEstado.get().getEstado().equals("Não Iniciada") || novoEstado.get().getEstado().equals("Finalizada")) {
                    tarefa.setEstado(novoEstado.get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transição de estado inválida para a tarefa. Os estados possíveis são: Não Iniciada ou Finalizada");
                }
            } else if (tarefa.getEstado().getEstado().equals("Finalizada")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A tarefa já está no estado FINALIZADA e não pode ser alterada.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Estado inválido para a tarefa.");
            }
            tarefa = tarefaRepository.save(tarefa);
            return ResponseEntity.ok(tarefa);
        }
    }

    public ResponseEntity<?> updateTarefa(Integer id, TarefaUpdateDTO tarefaUpdateDTO) {
        Optional<Tarefa> tarefaFind = tarefaRepository.findById(id);

        if(!tarefaFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa com o id " + id + " não existe!");
        } else {
            Tarefa tarefa = tarefaFind.get();
            Optional<Tarefa> tarefaTitulo = tarefaRepository.findByTitulo(tarefaUpdateDTO.getTitulo());
            if(tarefaTitulo.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Tarefa com esse titulo já existe"); 
            } else {  
                if(tarefaUpdateDTO.getTitulo() != null) {
                    System.out.println("ETEST");
                    tarefa.setTitulo(tarefaUpdateDTO.getTitulo());    
                }
            }
            
            if(tarefaUpdateDTO.getDescricao() != null) {
                tarefa.setDescricao(tarefaUpdateDTO.getDescricao());    
            }
            
            tarefa = tarefaRepository.save(tarefa);
            return ResponseEntity.ok(tarefa);
        }
    }

    public ResponseEntity<?> arquivarTarefa(Integer id) { 
        Optional<Tarefa> tarefaFind = tarefaRepository.findById(id);

        if(!tarefaFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa com o id " + id + " não existe!");
        } else {
            Tarefa tarefa = tarefaFind.get();
            Optional<Estado> arquiva = estadoRepository.findByEstado("Arquivada");
            Optional<Estado> nIniciada = estadoRepository.findByEstado("Não Iniciada");
            if(tarefa.getEstado().equals(arquiva.get())) {
                tarefa.setEstado(nIniciada.get());
            } else {
                tarefa.setEstado(arquiva.get());   
            }
            tarefa = tarefaRepository.save(tarefa); 
            
            return ResponseEntity.ok(tarefa);
        }
    }

    public List<Tarefa> tarefaPorUsuario(Integer usuarioId) {
        return tarefaRepository.findByUsuarioId(usuarioId);
    }

    public List<Tarefa> tarefaArquivadaPorUsuario(Integer usuarioId) {
        return tarefaRepository.findArquivadaByUsuarioId(usuarioId);
    }

    public ResponseEntity<?> deleteTarefa(Integer id) {
        Optional<Tarefa> tarefaFind = tarefaRepository.findById(id);
        if(!tarefaFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa com o id " + id + " não existe!");
        } else {
            if(tarefaFind.get().getEstado().getEstado().equals("Em Progresso")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tarefas Em progresso não podem ser excluidas");
            }
            tarefaRepository.deleteById(id);
            return ResponseEntity.ok("Tarefa com o id " + id + " foi deletada!");
        }
    }

}
