import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
import styles from "./style.module.scss";

interface TableProps {
  columns: any[];
  data: any[];
}

const TableTarefas: React.FC<TableProps> = ({ columns, data }) => {
  const [selected, setSelected] = useState(null);

  const handleRowClick = async (row) => {
    setSelected(row.original);
    console.log(row.original);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useRowSelect
    );

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const isSelected = row.original === selected;
                return (
                  <td
                    {...cell.getCellProps({
                      onClick: () => handleRowClick(row),
                      style: {
                        background: isSelected ? "lightgray" : "white",
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
  );
};

export default TableTarefas;
