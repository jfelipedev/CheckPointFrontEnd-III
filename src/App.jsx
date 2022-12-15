import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./Contexts/ThemeContext";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function App() {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={theme}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
