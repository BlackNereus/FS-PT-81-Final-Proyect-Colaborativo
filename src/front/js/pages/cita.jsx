import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import PropTypes from "prop-types";
import DetallesCita from "../component/detallesCita.jsx";


const Cita = () => {

    return (
        <DetallesCita />
      );
    };
    

    // Cita.propTypes = {
    //   direccion: PropTypes.string.isRequired,
    //   fecha: PropTypes.string.isRequired,
    //   hora: PropTypes.string.isRequired
    // };
    
    export default Cita;
