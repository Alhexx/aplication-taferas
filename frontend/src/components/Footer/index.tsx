import { Container } from "react-bootstrap";
import styles from "./style.module.scss";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export function Footer() {
  return (
    <footer id="footer">
      <div id="copyrights" className={styles.footer}>
        <Container>
          <div className={styles.copyright}>
            Copyrights &copy; 2023 All Rights Reserved by SAT.
            <br />
          </div>
          <div className={styles.info}>
            <i>
              <FaEnvelope />
            </i>{" "}
            dev@sat.com <span className="middot">&middot;</span>{" "}
            <i>
              <FaPhoneAlt />
            </i>{" "}
            +55 (84) 9999-9999
          </div>
        </Container>
      </div>
    </footer>
  );
}
