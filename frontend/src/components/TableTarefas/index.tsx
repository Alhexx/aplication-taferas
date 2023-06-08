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
              {
                console.log(row.original);
              }
              const rowColor =
                estado == "Não Iniciada"
                  ? "white"
                  : estado == "Em Progresso"
                  ? "#b2e2f2"
                  : "#fabfb7";

              {
                console.log(rowColor);
              }
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    const isSelected = row.original === selected;
                    return (
                      <td
                        {...cell.getCellProps({
                          onClick: () => handleRowClick(row),
                          style: {
                            background: isSelected ? "lightgray" : rowColor,
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

        <MenuItem className={styles.menuitem}>Mudar Status</MenuItem>
      </ContextMenu>
    </>
  );
};

export default TableTarefas;
