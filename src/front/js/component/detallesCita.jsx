import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const DetallesCita = ({ direccion, fecha, hora }) => {
    return (
      <div className="appointment-container text-center">
        <h1 className="mt-4">¡GRACIAS POR TU RESERVA!</h1>
        <p className="confirmation-text mt-3">Reserva confirmada en:</p>
        <p className="direccion fw-bold">{direccion}</p>
        <hr className="divider" />
        <p className="details fw-bold">{fecha}</p>
        <hr className="divider" />
        <p className="details fw-bold">{hora}</p>
        <footer className="note mt-4">
          <p>
            NOTA: Si no podrás asistir, por favor cancela con al menos 
             <strong> 12h</strong> de anticipación para liberar el espacio.
          </p>
        </footer>
      </div>
    );
  };
  

  DetallesCita.propTypes = {
    direccion: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
  };
  
 
  export default DetallesCita;