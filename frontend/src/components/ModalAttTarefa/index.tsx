import React, { useEffect, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { Button, Row, Col, Alert, Form, Card, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";
import { backend_url } from "../../../utils/conf";
import styles from "./style.module.scss";

interface ModatlAttTarefaProps {
  dados: [] | null;
  show: boolean;
  fecharModal: () => void;
  atualizaTabela: () => Promise<void>;
}

const ModatlAttTarefa: React.FC<ModatlAttTarefaProps> = ({
  dados,
  show,
  fecharModal,
  atualizaTabela,
}) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tarefaData = {
      titulo: titulo,
      descricao: descricao,
    };

    let id = dados ? dados.id : null;
    setIsWaitingResponse(true);
    try {
      await api.put("/tarefas/" + id, tarefaData, {
        headers: { "content-type": "application/json" },
      });
      limparCampos();
      try {
        await atualizaTabela();
      } catch (error) {
        toast.error("Erro de Atualizacao da tabela");
      }
      toast.success("Tarefa atualizada com sucesso!");
      fecharModal();
    } catch (error) {
      setIsWaitingResponse(false);
      toast.error(error.response.data);
    }
    setIsWaitingResponse(false);
  };

  useEffect(() => {
    if (dados !== null) {
      setTitulo(dados.titulo);
      setDescricao(dados.descricao);
    } else {
      limparCampos();
    }
  }, [dados]);

  return (
    <Modal show={show} onHide={fecharModal}>
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label>Titulo</label>
          <Form.Control
            className={styles.fontForm}
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Dê um titulo a sua tarefa"
          />
          <label>Descrição</label>
          <Form.Control
            className={styles.fontForm}
            as="textarea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Escreva a descrição da Tarefa"
          />

          <Button
            variant="primary"
            size="sm"
            disabled={isWaitingResponse}
            onClick={handleSubmit}
          >
            Atualizar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModatlAttTarefa;
