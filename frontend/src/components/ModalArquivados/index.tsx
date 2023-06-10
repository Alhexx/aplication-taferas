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
import { Button, Col, Row, Modal } from "react-bootstrap";

interface ModalArquivadosProps {
  columns: any[];
  data: any[];
  show: boolean;
  fecharModal: () => void;
  atualizaTabela: () => Promise<void>;
}

const ModalArquivados: React.FC<ModalArquivadosProps> = ({
  columns,
  data,
  show,
  fecharModal,
  atualizaTabela,
}) => {
  const [selected, setSelected] = useState(null);
  const handleRowClick = async (row) => {
    setSelected(row.original);
  };

  async function desarquivarTarefa() {
    try {
      const res = await api.post("/tarefas/des-arquivar/" + selected.id);
      try {
        await atualizaTabela();
      } catch (error) {
        toast.error("Erro de Atualizacao da tabela");
      }
      toast.success("Tarefa Desarquivada!");
    } catch (error) {
      toast.error("Erro!");
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
    <Modal show={show} onHide={fecharModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <ContextMenuTrigger id="arquivadas" holdToDisplay={-1}>
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
                  const isSelected = row.original === selected;
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
                                background: "white",
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
          </ContextMenuTrigger>
          <ContextMenu id="arquivadas" className={styles.contextmenu}>
            <MenuItem
              className={`${styles.menuitem} ${
                selected === null ? styles.disabled : ""
              }`}
              onClick={() => desarquivarTarefa()}
              disabled={selected === null}
            >
              Desarquivar
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
        </>
      </Modal.Body>
    </Modal>
  );
};

export default ModalArquivados;
