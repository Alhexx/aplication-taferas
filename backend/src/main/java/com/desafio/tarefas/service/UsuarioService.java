package com.desafio.tarefas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafio.tarefas.model.Usuario;
import com.desafio.tarefas.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid usuario ID: " + id));
    }

    public Usuario createUsuario(Usuario usuario) {
        Optional<Usuario> usuarioFind = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioFind.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        return usuarioRepository.save(usuario);
    }

    public void updateUsuario(Long id, Usuario usuario) {
        if (!usuarioRepository.existsById(id)) {
            throw new IllegalArgumentException("Invalid usuario ID: " + id);
        }
        // Additional validations and business logic can be implemented here
        usuario.setId(id);
        usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new IllegalArgumentException("Invalid usuario ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> findByEmail(String email) {
        // Implement the logic to find a Usuario by email from the repository
        // Example:
        return usuarioRepository.findByEmail(email);
    }
}
