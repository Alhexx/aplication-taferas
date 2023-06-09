import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu,
} from "react-contextmenu";
import { toast } from "react-toastify";
import api from "../../services/api";

import styles from "./style.module.scss";
import { Col } from "react-bootstrap";
import ModalStatus from "../ModalStatus";

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
  const handleRowClick = async (row) => {
    setSelected(row.original);
  };

  async function arquivaTarefa() {
    try {
      const res = await api.post("/tarefas/arquivar/" + selected.id);
      try {
        await atualizaTabela();
      } catch (error) {
        toast.error("Erro de Atualizacao da tabela");
      }
      toast.success("Tarefa Arquivada!");
    } catch (error) {
      toast.error("Erro!");
    }
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [{ id: "id", desc: false }],
        },
      },
      useRowSelect
    );

  return (
    <>
      <ContextMenuTrigger id="tarefas" holdToDisplay={-1}>
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
            {rows.map((row) => {
              prepareRow(row);
              const estado = row.original.estado;

              const isSelected = row.original === selected;
              const rowColor =
                estado == "Não Iniciada"
                  ? "white"
                  : estado == "Em Progresso"
                  ? "#b0f2c2"
                  : "#fabfb7";

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
      </ContextMenuTrigger>
      <ContextMenu id="tarefas" className={styles.contextmenu}>
        <MenuItem
          className={styles.menuitem}
          onClick={() => {
            arquivaTarefa();
          }}
          disabled={selected === null}
        >
          Arquivar
        </MenuItem>

        <MenuItem
          className={styles.menuitem}
          onClick={() => {
            setModalStatus(true);
          }}
          disabled={selected === null}
        >
          Mudar Status
        </MenuItem>
      </ContextMenu>
      <Col xs={12} sm={12} md={12} lg={12}>
        <ModalStatus
          show={modalStatus}
          fecharModal={() => setModalStatus(false)}
          atualizaTabela={atualizaTabela}
          tarefaId={selected ? selected.id : null}
        />
      </Col>
    </>
  );
};

export default TableTarefas;
