/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import { ThemeContext } from "../Contexts/ThemeContext";
import api from "../Services/api";

const ScheduleForm = () => {
  const { theme } = useContext(ThemeContext)
  const token = localStorage.getItem('@DHODONTO_TOKEN')
  const [dentistas, setDentistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [inputsForm, setInputsForm] = useState({ paciente: {}, dentista: {}, dataHoraAgen: "" });  
  
  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    getDentistas();
    getPacientes();    
  }, []);

  const getDentistas = async () => {
    try {
      const response = await api.get("/dentista", {
        headers: {
          token: `Bearer ${token}`
        }
      })
      setDentistas(response.data);
    } catch (error) {
      alert(error)
    }
  };

  const getPacientes = async () => {
    try {
      const response = await api.get("/paciente", {
        headers: {
          token: `Bearer ${token}`
        }
      })
      setPacientes(response.data?.body)
    } catch (error) {
      alert(error)
    }
  };  

 const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    e.preventDefault();
    createConsulta();
    e.target.reset();    
  };

  const createConsulta = async () => {

    const body = {
      paciente: {
        matricula: inputsForm.paciente
      },
      dentista: {
        matricula: inputsForm.dentista
      },
      dataHoraAgendamento: inputsForm.dataHoraAgen
    };

    try {
      const response = await api.post("/consulta", body, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      alert("Consulta agendada com sucesso!")
    } catch (error) {
      alert("Não foi possível agendar a consulta")
    }
  };  

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${theme}}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" onChange={(e) => setInputsForm({ ...inputsForm, dentista: e.target.value })}>
                <option></option>
                {
                  dentistas.map((dentista) =>
                    <option key={dentista.matricula} value={dentista.matricula} >
                      {dentista.nome}
                    </option>
                  )
                }
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select className="form-select" name="patient" id="patient" onChange={(e) => setInputsForm({ ...inputsForm, paciente: e.target.value })}>
                <option></option>
                {
                  pacientes.map((paciente) =>
                    <option key={paciente.matricula} value={paciente.matricula}>
                      {paciente.nome} {paciente.sobrenome}
                    </option>
                  )
                }
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={(e) => setInputsForm({ ...inputsForm, dataHoraAgen: e.target.value })}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-${theme} ${styles.button}`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
