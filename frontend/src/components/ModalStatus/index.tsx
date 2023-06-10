import React, { useEffect, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { Button, Row, Col, Alert, Form, Card, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import api from "../../services/api";
import { backend_url } from "../../../utils/conf";
import styles from "./style.module.scss";

interface ModalTarefaProps {
  tarefaId: number;
  show: boolean;
  fecharModal: () => void;
  atualizaTabela: () => Promise<void>;
}

const ModalStatus: React.FC<ModalTarefaProps> = ({
  show,
  fecharModal,
  atualizaTabela,
  tarefaId,
}) => {
  const [estado, setEstado] = useState("");
  const [estados, setEstados] = useState([]);

  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const limparCampos = () => {
    setEstado("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const estadoData = {
      idEstado: estado.value,
    };

    setIsWaitingResponse(true);
    try {
      await api.put("/tarefas/estado/" + tarefaId, estadoData, {
        headers: { "content-type": "application/json" },
      });
      limparCampos();
      try {
        await atualizaTabela();
      } catch (error) {
        toast.error("Erro de Atualizacao da tabela");
      }
      toast.success("Estado atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      setIsWaitingResponse(false);
      toast.error(error.response.data);
    }
    setIsWaitingResponse(false);
  };

  async function getData() {
    try {
      setIsWaitingResponse(true);
      const res = await api.get("/estados/validos");

      const dados = res.data.map((item) => ({
        value: item.id,
        label: item.estado,
      }));

      setEstados(dados);

      setIsWaitingResponse(false);
    } catch (error) {
      toast.error("Erro de fetch");
      setIsWaitingResponse(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal show={show} onHide={fecharModal}>
      <Modal.Header closeButton>
        <Modal.Title>Mudança de Estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          className={styles.select}
          value={estado}
          onChange={(e) => setEstado(e)}
          placeholder="Selecione o estado da tarefa"
          options={estados}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          disabled={isWaitingResponse}
        >
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStatus;
