import { bottom } from "@popperjs/core";
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface FilterTabelasProps {
  globalFilter: string;
  setGlobalFilter: (value: string | undefined) => void;
}

export function FilterTabelas({
  globalFilter,
  setGlobalFilter,
}: FilterTabelasProps) {
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      style={{
        marginBottom: "15px",
      }}
    >
      <Row>
        <Form.Group>
          <input
            style={{
              height: "50px",
              padding: "5px",
              fontSize: "14px",
              marginBottom: "0",
            }}
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Digite aqui sua consulta..."
            autoComplete="off"
            autoFocus
          />
        </Form.Group>
      </Row>
    </Form>
  );
}
