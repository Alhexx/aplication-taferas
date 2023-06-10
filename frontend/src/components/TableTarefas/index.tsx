import React, { useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu,
} from "react-contextmenu";
import { toast } from "react-toastify";
import api from "../../services/api";

import styles from "./style.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalStatus from "../ModalStatus";
import ModatlAttTarefa from "../ModalAttTarefa";

interface TableProps {
  columns: any[];
  data: any[];
  atualizaTabela: () => Promise<void>;
}

const TableTarefas: React.FC<TableProps> = ({
  columns,
  data,
  atualizaTabela,
}) => {
  const [selected, setSelected] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalAtt, setModalAtt] = useState(false);
  const handleRowClick = async (row) => {
    setSelected(row.original);
  };

  async function arquivaTarefa() {
    try {
      const res = await api.post("/tarefas/des-arquivar/" + selected.id);
      try {
        await atualizaTabela();
      } catch (error) {
        toast.error("Erro de Atualizacao da tabela");
      }
      toast.success("Tarefa Arquivada!");
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function excluiTarefa() {
    try {
      const res = await api.delete("/tarefas/delete/" + selected.id);
      try {
        await atualizaTabela();
      } catch (error) {
        toast.error("Erro de Atualizacao da tabela");
      }
      toast.success("Tarefa Excluída!");
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect
  );

  return (
    <>
      <ContextMenuTrigger id="tarefas" holdToDisplay={-1}>
        <div className={styles.tablewrapper}>
          <table {...getTableProps()} className={styles.table}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const estado = row.original.estado;
                const isSelected = row.original === selected;
                const rowColor =
                  estado == "Não Iniciada"
                    ? "#ffe4e1"
                    : estado == "Em Progresso"
                    ? "#b0f2c2"
                    : "#ff94a2";
                return (
                  <tr
                    {...row.getRowProps()}
                    style={{
                      border: isSelected ? "5px solid #cce5ff" : "none",
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps({
                            onClick: () => handleRowClick(row),
                            style: {
                              border: "none",
                              background: rowColor,
                              cursor: "pointer",
                            },
                          })}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id="tarefas" className={styles.contextmenu}>
        <MenuItem
          className={`${styles.menuitem} ${
            selected === null ? styles.disabled : ""
          }`}
          onClick={() => {
            arquivaTarefa();
          }}
          disabled={selected === null}
        >
          Arquivar
        </MenuItem>

        <MenuItem
          className={`${styles.menuitem} ${
            selected === null || selected.estado === "Finalizada"
              ? styles.disabled
              : ""
          }`}
          onClick={() => {
            setModalAtt(true);
          }}
          disabled={selected === null || selected.estado === "Finalizada"}
        >
          Editar Tarefa
        </MenuItem>

        <MenuItem
          className={`${styles.menuitem} ${
            selected === null || selected.estado === "Finalizada"
              ? styles.disabled
              : ""
          }`}
          onClick={() => {
            setModalStatus(true);
          }}
          disabled={selected === null || selected.estado === "Finalizada"}
        >
          Mudar Status
        </MenuItem>
        <MenuItem
          className={`${styles.menuitem} ${
            selected === null || selected.estado === "Em Progresso"
              ? styles.disabled
              : ""
          }`}
          onClick={() => {
            excluiTarefa();
          }}
          disabled={selected === null || selected.estado === "Em Progresso"}
        >
          Excluir
        </MenuItem>
      </ContextMenu>
      <Row className={styles.tablepagination}>
        <Col xs={12} sm="auto" className="d-flex py-1">
          <div>
            <Button
              as={Col}
              xs="auto"
              variant="dark"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className={styles.button}
            >
              {"<<"}
            </Button>{" "}
            <Button
              as={Col}
              xs="auto"
              variant="dark"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={styles.button}
            >
              {"<"}
            </Button>{" "}
          </div>
        </Col>
        <Col>
          <Col xs={12} sm="auto" className="d-flex py-1">
            <span>
              Página{" "}
              <strong>
                {state.pageIndex + 1} de {pageOptions.length}
              </strong>
            </span>
          </Col>
        </Col>
        <Col xs={12} sm="auto" className="d-flex py-1">
          <div>
            <Button
              as={Col}
              xs="auto"
              variant="dark"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={styles.button}
            >
              {">"}
            </Button>{" "}
            <Button
              as={Col}
              xs="auto"
              variant="dark"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={styles.button}
            >
              {">>"}
            </Button>{" "}
          </div>
        </Col>
      </Row>

      <Col xs={12} sm={12} md={12} lg={12}>
        <ModalStatus
          show={modalStatus}
          fecharModal={() => setModalStatus(false)}
          atualizaTabela={atualizaTabela}
          tarefaId={selected ? selected.id : null}
        />
        <ModatlAttTarefa
          show={modalAtt}
          fecharModal={() => setModalAtt(false)}
          atualizaTabela={atualizaTabela}
          dados={selected ? selected : null}
        />
      </Col>
    </>
  );
};

export default TableTarefas;
