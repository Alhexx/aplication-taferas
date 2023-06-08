package com.desafio.tarefas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafio.tarefas.model.Usuario;
import com.desafio.tarefas.model.dto.UsuarioDTO;
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

    public Optional<Usuario> getUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Usuario createUsuario(UsuarioDTO usuarioDTO) {
        Optional<Usuario> usuarioFind = usuarioRepository.findByEmail(usuarioDTO.getEmail());
        if (usuarioFind.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }  

        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setName(usuarioDTO.getName());
        usuario.setPassword(usuarioDTO.getPassword());

        return usuarioRepository.save(usuario);
    }

    public void updateUsuario(Integer id, Usuario usuario) {
        if (!usuarioRepository.existsById(id)) {
            throw new IllegalArgumentException("Invalid usuario ID: " + id);
        }
        usuario.setId(id);
        usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new IllegalArgumentException("Invalid usuario ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
