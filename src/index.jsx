import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Routes/Login'
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";
import ThemeProvider from "./Contexts/ThemeContext";
import AuthProvider from "./Contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
   <React.StrictMode>
      <AuthProvider>
         <ThemeProvider>
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<App />}>
                     <Route index element={<Home />}></Route>
                     <Route path="/login" element={<Login />}></Route>
                     <Route path="/dentista/:id" element={<Detail />}></Route>
                  </Route>
               </Routes>
            </BrowserRouter>
         </ThemeProvider>
      </AuthProvider>
   </React.StrictMode>
);
