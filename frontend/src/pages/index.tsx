import { Container, Row, Col, Alert, Form, Card } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <section>
        <div className="container">
          <article>
            <hgroup>
              <h2>Sistema de acompanhamento de Tarefas</h2>
              <h3>Entre na sua conta</h3>
            </hgroup>
            <div className="grid">
              <a href="/register">
                <button>Registre-se</button>
              </a>

              <a href="/login">
                <button>Login</button>
              </a>
            </div>
            <hgroup>
              <h3>
                Para ter acesso a todas as funcionalidades do SAT você deve
                estar logado!
              </h3>
            </hgroup>
          </article>
        </div>
      </section>

      <main className="container">
        <section>
          <hgroup>
            <h2>SAT (Sistema de Acompanhamento de Tarefas)</h2>
          </hgroup>
          <p>
            Uma plataforma eficiente para gerenciar e acompanhar tarefas. Com
            recursos intuitivos, como personalização de estados, atribuição de
            tarefas e comunicação em equipe, o SAT simplifica o fluxo de
            trabalho, aumenta a produtividade e ajuda a alcançar objetivos de
            forma mais eficaz. Experimente o SAT e transforme a maneira como
            você organiza suas tarefas.
          </p>
        </section>
      </main>
    </>
  );
}
