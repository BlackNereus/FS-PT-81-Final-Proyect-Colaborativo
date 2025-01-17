import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js"
import "bootstrap/dist/css/bootstrap.min.css";

export const Formulario = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("User logged in:", formData);
    };
  
    return (
      <form className="form" onSubmit={handleSubmit}>
        <h1>Inicio de sesion</h1>
        <div className="form-group">
          <label className="label" htmlFor="name">
            Nombre <span className="required">*</span>
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="button"
        >
          Iniciar Sesión
        </button>
        <p className="footer-login">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="link">
            Regístrate aquí
          </a>
        </p>
      </form>
    );
  };
  
  export default Formulario;