import { useEffect, useState } from "react";
import Card from "../Components/Card";
import api from "../Services/api";

const Home = () => {
   const token = localStorage.getItem('@DHODONTO_TOKEN')

   const [ dentistas, setDentistas ] = useState([])

   useEffect(() => {
      //Nesse useEffect, deverá ser obtido todos os dentistas da API
      //Armazena-los em um estado para posteriormente fazer um map
      //Usando o componente <Card />
      getDentistas()

   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   async function getDentistas() {
      try {
         const response = await api.get("/dentista", {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })

         setDentistas(response.data)
         console.log(response);
      } catch (error) {
         alert("Falha na chamada da API GET Dentista")
      }
   } 

   return (
      <>
         <h1>Home</h1>
         <div className="card-grid container">
            {
               dentistas.map( (item) => 
                  <Card key={item.matricula} dentista={item}/>
               )
            }
         </div>
      </>
   );
};

export default Home;
