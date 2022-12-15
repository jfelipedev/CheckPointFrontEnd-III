/* eslint-disable react-hooks/exhaustive-deps */
import api from "../Services/api";
import styles from "./Form.module.css";
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";


const LoginForm = () => {
   const keyToken = "@DHODONTO_TOKEN"
   const { setIsAuth } = useContext(AuthContext)
   const { theme } = useContext(ThemeContext)

   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const navigate = useNavigate();

   async function handleSubmit(e) {
      //Nesse handlesubmit você deverá usar o preventDefault,
      //enviar os dados do formulário e enviá-los no corpo da requisição 
      //para a rota da api que faz o login /auth
      //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
      //no localstorage para ser usado em chamadas futuras
      //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
      //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

      e.preventDefault()

      try {
         const response = await api.post("/auth", {
            username,
            password
         })

         console.log(response.data.token);
         localStorage.setItem(keyToken, response.data.token)
         setIsAuth(true)
         navigate("/")

      } catch (error) {
         console.log(error);
         localStorage.removeItem(keyToken)
         setIsAuth(false)
         alert('Falha no Login!\n' + error)
      }
   }

   return (
      <>
         {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
         <div
            className={`text-center card  container ${styles.card} ${theme}` }
         >
            <div className={`card-body ${styles.CardBody}`}>
               <form onSubmit={handleSubmit}>
                  <input
                     className={`form-control ${styles.inputSpacing} `}
                     placeholder="Login"
                     name="login"
                     onChange={(e) => setUsername(e.target.value)}
                     value={username}
                     required
                  />
                  <input
                     className={`form-control ${styles.inputSpacing}`}
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     name="password"
                     type="password"
                     required
                  />
                  <button className="btn btn-primary" type="submit">
                     Send
                  </button>
               </form>
            </div>
         </div>
      </>
   );
};

export default LoginForm;
