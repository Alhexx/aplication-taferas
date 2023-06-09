import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import api from "../services/api";
import style from "../styles/register.module.scss";
import { backend_url } from "../../utils/conf";
import { toast } from "react-toastify";

export default function register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconf, setPasswordconf] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  //envio das informações para o backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    if (password == passwordconf) {
      setIsWaitingResponse(true);
      try {
        await api.post(backend_url + "/usuarios", userData, {
          headers: { "content-type": "application/json" },
        });

        toast.success("Usuário cadastrado com sucesso!");
      } catch (error) {
        console.log(JSON.stringify(error));
        setIsWaitingResponse(false);
        toast.error("Erro de cadastramento!");
      }
      setIsWaitingResponse(false);
    } else toast.error("Senhas não batem!");
  };

  return (
    <div>
      <Container className={style.container}>
        <hgroup>
          <h1>Registre-se</h1>
        </hgroup>
        <div className={style.row}>
          <form className={style.form} onSubmit={handleSubmit}>
            <Row xs={12}>
              <Col xs={6}>
                <label>Nome</label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  aria-describedby="basic-addon1"
                />
                <label>Email</label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  aria-describedby="basic-addon1"
                />
              </Col>
              <Col xs={6}>
                <label htmlFor="PASSWORD">Senha</label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  aria-describedby="basic-addon1"
                />
                <label htmlFor="PASSWORD">Confirme Senha</label>
                <Form.Control
                  type="password"
                  value={passwordconf}
                  onChange={(e) => setPasswordconf(e.target.value)}
                  placeholder="Confirme sua senha"
                  aria-describedby="basic-addon1"
                />
              </Col>
            </Row>

            <input
              type="submit"
              value="Registre-se"
              disabled={isWaitingResponse}
            />
          </form>
        </div>
      </Container>
    </div>
  );
}
