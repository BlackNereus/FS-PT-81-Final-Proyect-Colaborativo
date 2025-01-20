
import React from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {

  const navigate = useNavigate(); 

  const handlePruebaYa = () => {
    navigate("/login"); 
  };

	

		

  return (
    <nav className="navbar d-flex">
      <div className="container">
        <button onClick={handlePruebaYa} className="btn-green">Prueba ya</button>
        <a className="nav-link active" style={{ color: "white" }} aria-current="#" href="#">Precio</a>
        <a className="nav-link" style={{ color: "white" }} href="#">Funcionabilidades</a>
        <a className="nav-link" style={{ color: "white" }} href="#">Contacto</a>
        <a className="nav-link" style={{ color: "white" }} href="#">Noticias</a>
      </div>
    </nav>
  );
};