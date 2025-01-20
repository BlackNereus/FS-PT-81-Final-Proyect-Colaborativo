import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Formulary } from "../component/formulary.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div id="carouselExampleCaptions" className="carousel slide">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://wallpapers.com/images/high/hd-medical-health-icon-with-nurse-v1txjiifhv3bssoo.webp" className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h1>BIENVENIDO A CLINICA CENTRO</h1>
							<h3>Tu salud y la de tu familia es nuetra resposibilidad</h3>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://wallpapers.com/images/high/hd-medical-health-icon-with-nurse-v1txjiifhv3bssoo.webp" className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h1>TECNOLOGIA</h1>
							<h3>Tecnología de vanguardia para diagnósticos precisos</h3>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://wallpapers.com/images/high/hd-medical-health-icon-with-nurse-v1txjiifhv3bssoo.webp" className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h1>SALUD</h1>
							<h3>Conoce nuestras especialidades médicas para toda la familia</h3>
						</div>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
			<div className="container">
				<div className="row d-flex justify-content-around gap-1 p-1">
					<div className="card text-bg-primary mb-3 cardmedico col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
						<div className="card-body cardbodymedico">
							<h1 className="card-title">Dr. Ivan Herrera</h1>
							<h3 className="card-text">Médico Cirujano</h3>
							<h3 className="card-text">Especialidad en Cardiología</h3>
							<a href="#" className="btn btn-lg btn-success">AGENDAR CITA</a>
						</div>
					</div>
					<div className="card text-bg-primary mb-3 cardmedico col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
						<div className="card-body cardbodymedico">
							<h1 className="card-title">Dr. Ivan Herrera</h1>
							<h3 className="card-text">Médico Cirujano</h3>
							<h3 className="card-text">Especialidad en Cardiología</h3>
							<a href="#" className="btn btn-lg btn-success">AGENDAR CITA</a>
						</div>
					</div>
					<div class="card text-bg-light col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
						<img src="https://cdn.pixabay.com/photo/2017/08/01/23/01/doctor-2568476_1280.jpg" class="card-img" alt="..." />
						<div class="card-img-overlay d-grid align-content-between">
							<div className="btn btn-primary ">
								<h1 className="card-text cardtextimg">Dr. Ivan Herrera</h1>
								<h3 className="card-text cardtextimg">Médico Cirujano</h3>
								<h3 className="card-text cardtextimg">Especialidad en Cardiología</h3>
							</div>
							<a href="#" className="btn btn-lg btn-primary cardtextimg">AGENDAR CITA</a>
						</div>
					</div>
					<div class="card text-bg-light col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
						<img src="https://cdn.pixabay.com/photo/2017/08/01/23/01/doctor-2568476_1280.jpg" class="card-img" alt="..." />
						<div class="card-img-overlay d-grid align-content-between">
							<div className="btn btn-primary ">
								<h1 className="card-text cardtextimg">Dr. Ivan Herrera</h1>
								<h3 className="card-text cardtextimg">Médico Cirujano</h3>
								<h3 className="card-text cardtextimg">Especialidad en Cardiología</h3>
							</div>
							<a href="#" className="btn btn-lg btn-primary cardtextimg">AGENDAR CITA</a>
						</div>
					</div>
				</div>
			</div>
			<div className="card text-bg-danger mb-3 text-center">
				<div className="card-header">
					<h1 className="card-title">URGENCIAS</h1>
					<h4 className="card-text">624445566 / 6245558899</h4>
				</div>
			</div>
		</>
	);
};
