import styles from "./Card.module.css";
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

const Card = ({ dentista } ) => {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${theme}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${theme} ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <Link to={`/dentista/${dentista.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{dentista.nome} {dentista.sobrenome}</h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
