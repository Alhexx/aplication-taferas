import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";
import Router from "next/router";
import React from "react";
import TableTarefas from "../../components/TableTarefas";
import style from "../../styles/client.module.scss";
import ModalTarefa from "../../components/ModalTarefa";
import ModalArquivados from "../../components/ModalArquivados";

const Client: React.FC = () => {
  const [data, setData] = useState([]);
  const [arq, setArq] = useState([]);
  const [nomeUser, setNomeUser] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalArq, setModalArq] = useState(false);
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

      const resArq = await api.get(
        "/tarefas/arquivadas/usuario/" + localStorage.getItem("id")
      );

      const dados = res.data.map((item) => ({
        id: item.id,
        titulo: item.titulo,
        descricao: item.descricao,
        estado: item.estado.estado,
        estadoId: item.estado.id,
      }));
      const dadosArq = resArq.data.map((item) => ({
        id: item.id,
        titulo: item.titulo,
        estado: item.estado.estado,
      }));

      dados.sort((a, b) => a.estadoId - b.estadoId);

      setData(dados);
      setArq(dadosArq);

      setIsLoading(false);
    } catch (error) {
      toast.error("Erro de fetch");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      Router.push("/");
    } else {
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setNomeUser(storedName);
      }
      getData();
    }
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
                      <h2>Bem vindo, {nomeUser}</h2>
                      <h3>Gerenciamento de Tarefas</h3>
                    </hgroup>{" "}
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <Row style={{ justifyContent: "end" }}>
                      <Button
                        className={style.button}
                        variant="success"
                        size="sm"
                        onClick={() => {
                          setModalAdd(true);
                        }}
                      >
                        Adicionar
                      </Button>
                    </Row>
                    <Row style={{ justifyContent: "end" }}>
                      <Button
                        className={style.button}
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setModalArq(true);
                        }}
                      >
                        Arquivados
                      </Button>
                    </Row>
                  </Col>
                </Row>
                <TableTarefas
                  columns={columns}
                  data={data}
                  atualizaTabela={getData}
                />
              </article>
            </div>
          </section>
          <Col xs={12} sm={12} md={12} lg={12}>
            <ModalTarefa
              show={modalAdd}
              fecharModal={() => setModalAdd(false)}
              atualizaTabela={getData}
            />
            <ModalArquivados
              columns={columns}
              data={arq}
              show={modalArq}
              fecharModal={() => setModalArq(false)}
              atualizaTabela={getData}
            />
          </Col>
        </>
      )}
    </>
  );
};

export default Client;
