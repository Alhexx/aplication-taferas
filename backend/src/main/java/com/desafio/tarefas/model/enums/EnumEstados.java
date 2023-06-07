package com.desafio.tarefas.model.enums;

public enum EnumEstados {
    NAO_INICIADA("Não Iniciada"),
    EM_PROGRESSO("Em Progresso"),
    FINALIZADA("Finalizada"),
    ARQUIVADA("Arquivada");

    private String label;

    EnumEstados(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
