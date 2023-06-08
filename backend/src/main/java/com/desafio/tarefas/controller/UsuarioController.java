package com.desafio.tarefas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.desafio.tarefas.model.Usuario;
import com.desafio.tarefas.model.dto.LoginDTO;
import com.desafio.tarefas.model.dto.UsuarioDTO;
import com.desafio.tarefas.service.UsuarioService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
    Optional<Usuario> usuarioFind = usuarioService.findByEmail(loginDTO.getEmail());

    if (!usuarioFind.isPresent()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not registered");
    }
    
    if (!usuarioFind.get().getPassword().equals(loginDTO.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    return ResponseEntity.ok(usuarioFind.get());
}

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable("id") Integer id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);
        if(usuario.isPresent()) {
           return ResponseEntity.ok(usuario.get()); 
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
        
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody @Valid UsuarioDTO usuarioDTO) {
        Usuario createdUsuario = usuarioService.createUsuario(usuarioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUsuario(@PathVariable("id") Integer id, @RequestBody Usuario usuario) {
        usuarioService.updateUsuario(id, usuario);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable("id") Integer id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
