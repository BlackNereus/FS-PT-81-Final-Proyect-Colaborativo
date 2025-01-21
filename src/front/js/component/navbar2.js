import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {

  const navigate = useNavigate();

  const handleIniciaSesion = () => {
    navigate("/login");
  };
  return (
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <button onClick={handleIniciaSesion} className="btn-green">INICIA SESION</button>
            <a class="nav-link" href="#">PRECIOS</a>
            <a class="nav-link" href="#">CONTACTO</a>
            <a class="nav-link" href="#">NOTICIAS</a>
          </div>
        </div>
      </div>
    </nav>
  );
};


/*return (
  <nav className="navbar d-flex">
    <div className="container">
      <button onClick={handleIniciaSesion} className="btn-green">INICIA SESION</button>
      <a className="nav-link active" style={{ color: "white" }} aria-current="#" href="#">Precio</a>
      <a className="nav-link" style={{ color: "white" }} href="#">Funcionabilidades</a>
      <a className="nav-link" style={{ color: "white" }} href="#">Contacto</a>
      <a className="nav-link" style={{ color: "white" }} href="#">Noticias</a>
    </div>
  </nav>
);
};