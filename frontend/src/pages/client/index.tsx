import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";
import Router from "next/router";
import React from "react";
import TableTarefas from "../../components/TableTarefas";

const Client: React.FC = () => {
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openTrainer, setOpenTrainer] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClosePagWorkout = () => setOpenWorkout(false);
  const handleClosePagTrainer = () => setOpenTrainer(false);
  const handleClosePagClient = () => setOpenClient(false);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "City",
      accessor: "city",
    },
  ];

  const data = [
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "London" },
    { name: "Bob Johnson", age: 40, city: "Paris" },
  ];

  return (
    <>
      {isLoading ? (
        <span>LOADING...</span>
      ) : (
        <>
          <section>
            <div className="container">
              <article>
                <hgroup>
                  <h2>Welcome back,</h2>
                  <h3>Begin to organize your fitness life</h3>
                </hgroup>
                <TableTarefas columns={columns} data={data} />
              </article>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Client;
