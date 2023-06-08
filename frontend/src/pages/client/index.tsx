import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";
import Router from "next/router";
import React from "react";
import TableTarefas from "../../components/TableTarefas";
import style from "../../styles/client.module.scss";
import ModalTarefa from "../../components/ModalTarefa";

const Client: React.FC = () => {
  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      Header: "Titulo",
      accessor: "titulo",
    },
    {
      Header: "Estado",
      accessor: "estado",
    },
  ];

  async function getData() {
    try {
      setIsLoading(true);
      const res = await api.get(
        "/tarefas/usuario/" + localStorage.getItem("id")
      );

      const dados = res.data.map((item) => ({
        id: item.id,
        titulo: item.titulo,
        descricao: item.descricao,
        estado: item.estado.estado,
        estadoId: item.estado.id,
      }));

      setData(dados);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <span>LOADING...</span>
      ) : (
        <>
          <section>
            <div className="container">
              <article>
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <hgroup>
                      <h2>Bem vindo, </h2>
                      <h3>Gerenciamento de Tarefas</h3>
                    </hgroup>{" "}
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <Button
                      className={style.addTarefa}
                      variant="success"
                      size="sm"
                      onClick={() => {
                        setModalAdd(true);
                      }}
                    >
                      Adicionar
                    </Button>
                  </Col>
                </Row>
                <TableTarefas columns={columns} data={data} />
              </article>
            </div>
          </section>
          <Col xs={12} sm={12} md={12} lg={12}>
            <ModalTarefa
              show={modalAdd}
              fecharModal={() => setModalAdd(false)}
              atualizaTabela={getData}
            />
          </Col>
        </>
      )}
    </>
  );
};

export default Client;
