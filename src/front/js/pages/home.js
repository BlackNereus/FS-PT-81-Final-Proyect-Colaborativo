import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Formulary } from "../component/formulary.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="jumbotron jumbotron_div">
				<div className="container">
					<h1 className="jumbotron_h1 text-center">BIENVENIDO A CLINICA CENTRO</h1>
					<button type="button" class="btn btn-outline-light jumbotron_btn">INICIAR SESION</button>
				</div>
			</div>
			<div className="container card_container">
				
				
			</div>
		</>
	);
};
