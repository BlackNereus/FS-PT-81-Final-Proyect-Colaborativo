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
					<div className="container-fluid d-flex justify-content-center">
						<button type="button" class="btn btn-outline-light jumbotron_btn">INICIAR SESION</button>
					</div>
				</div>
			</div>
			<div className="container-fluid">
				<div class="row">
					<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center gap-2">
						<div class="card">
							<img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" class="card-img-top" alt="DRACLARAFUENTES" />
							<div class="card-body">
								<h5 class="card-title">DRA CLARA FUENTES</h5>
								<p class="card-text">MEDICO CIRUJANO. CARDIOLOGIA.</p>
								<a href="#" class="btn btn-primary">AGENDAR CITA</a>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center gap-2">
						<div class="card">
							<img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" class="card-img-top" alt="DRACLARAFUENTES" />
							<div class="card-body">
								<h5 class="card-title">DRA CLARA FUENTES</h5>
								<p class="card-text">MEDICO CIRUJANO. CARDIOLOGIA.</p>
								<a href="#" class="btn btn-primary">AGENDAR CITA</a>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center gap-2">
						<div class="card">
							<img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" class="card-img-top" alt="DRACLARAFUENTES" />
							<div class="card-body">
								<h5 class="card-title">DRA CLARA FUENTES</h5>
								<p class="card-text">MEDICO CIRUJANO. CARDIOLOGIA.</p>
								<a href="#" class="btn btn-primary">AGENDAR CITA</a>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center gap-2">
						<div class="card">
							<img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" class="card-img-top" alt="DRACLARAFUENTES" />
							<div class="card-body">
								<h5 class="card-title">DRA CLARA FUENTES</h5>
								<p class="card-text">MEDICO CIRUJANO. CARDIOLOGIA.</p>
								<a href="#" class="btn btn-primary">AGENDAR CITA</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
