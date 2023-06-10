import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import api from "../services/api";
import style from "../styles/login.module.scss";

import { Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  //envio das informações para o backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    setIsWaitingResponse(true);

    try {
      const response = await api.post("/usuarios/login", userData, {
        headers: { "Content-Type": "application/json" },
      });

      const { id, name, email } = response.data;

      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      window.location.href = "/client";
    } catch (error) {
      toast.error(error.response.data);
    }

    setIsWaitingResponse(false);
  };

  return (
    <div>
      <Container className={style.container}>
        <hgroup>
          <h1>Logar-se</h1>
        </hgroup>
        <div className={style.row}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="USERNAME">Email</label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              aria-label="Login"
              aria-describedby="basic-addon1"
            />
            <label htmlFor="PASSWORD">Senha</label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              aria-label="password"
              aria-describedby="basic-addon1"
            />

            <input
              className={style.submit}
              type="submit"
              value="Entrar"
              disabled={isWaitingResponse}
            />
          </form>
        </div>
      </Container>
    </div>
  );
}
