package com.desafio.tarefas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.desafio.tarefas.service.EstadoService;

@SpringBootApplication
public class TarefasApplication implements CommandLineRunner{

	@Autowired
    private EstadoService estadoService;

	public static void main(String[] args) {
		SpringApplication.run(TarefasApplication.class, args);
	}
	
	@Override
    public void run(String... args) {
        estadoService.loadEnumData();
    }
}
