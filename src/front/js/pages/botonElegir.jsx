import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js"
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const BotonElegir = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    if (actions.register(formData)) navigate("/")
    console.log("User registered:", formData);
  };

  const handleSignedUpCliente = () => {
    navigate("/registro");
  }
  const handleSignedUpEmpresa = () => {
    navigate("/registroempresas")
  }
  return (
    <div className="container-botones">
      <h1>¿Quién eres? Elige tu perfil</h1>
      <hr></hr>
      <div className="d-flex justify-content-center">
        <div>
          <h2>Cliente</h2>
        </div>
        <div class="empresa">
          <h2>Empresa</h2>
        </div>
      </div>
    </div>

  );
};

