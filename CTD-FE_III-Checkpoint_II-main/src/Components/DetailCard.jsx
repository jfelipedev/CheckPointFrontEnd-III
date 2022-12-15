/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from 'react-router-dom';
import api from "../Services/api";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

const DetailCard = () => {
   const token = localStorage.getItem('@DHODONTO_TOKEN')
   const { theme } = useContext(ThemeContext)
   

   const [ dentista, setDentista ] = useState({
      nome: '',
      sobrenome: '',
      usuario: {
         username: ''
      }
   })
   const { id } = useParams()

   useEffect(() => {
      //Nesse useEffect, você vai fazer um fetch na api passando o 
      //id do dentista que está vindo do react-router e carregar os dados em algum estado
      getDentistaId()

   }, []);

   async function getDentistaId() {

      try {
         const response = await api.get(`/dentista?matricula=${id}`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })

         setDentista(response.data)

      } catch (error) {
         alert('Falha na busca de Dentista por ID')
      }
   }

   return (
      //As instruções que estão com {''} precisam ser 
      //substituídas com as informações que vem da api
      <>
         <h1>Detalhe sobre: {dentista.nome} {dentista.sobrenome} </h1>
         <section className={`${theme} card col-sm-12 col-lg-6 container`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <div
               className={`card-body row`}
            >
               <div className="col-sm-12 col-lg-6">
                  <img
                     className="card-img-top"
                     src="/images/doctor.jpg"
                     alt="doctor placeholder"
                  />
               </div>
               <div className="col-sm-12 col-lg-6">
                  <ul className="list-group">
                     <li className="list-group-item">Nome: {dentista.nome}</li>
                     <li className="list-group-item">
                        Sobrenome: {dentista.sobrenome}
                     </li>
                     <li className="list-group-item">
                        Usuário: {dentista.usuario.username}
                     </li>
                  </ul>
                  <div className="text-center">
                     {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
                     <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className={`btn btn-${theme} ${styles.button
                           }`}
                     >
                        Marcar consulta
                     </button>
                  </div>
               </div>
            </div>
         </section>
         <ScheduleFormModal />
      </>
   );
};

export default DetailCard;
