import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Formulary } from "../component/formulary.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div id="carouselExampleCaptions" class="carousel slide">
				<div class="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img src="https://wallpapers.com/images/high/hd-medical-health-icon-with-nurse-v1txjiifhv3bssoo.webp" class="d-block w-100" alt="..." />
						<div class="carousel-caption d-none d-md-block">
							<h1>BIENVENIDO A CLINICA CENTRO</h1>
							<h3>Tu salud y la de tu familia es nuetra resposibilidad</h3>
						</div>
					</div>
					<div class="carousel-item">
						<img src="https://wallpapers.com/images/high/hd-medical-health-icon-with-nurse-v1txjiifhv3bssoo.webp" class="d-block w-100" alt="..." />
						<div class="carousel-caption d-none d-md-block">
							<h1>TECNOLOGIA</h1>
							<h3>Tecnología de vanguardia para diagnósticos precisos</h3>
						</div>
					</div>
					<div class="carousel-item">
						<img src="https://wallpapers.com/images/high/hd-medical-health-icon-with-nurse-v1txjiifhv3bssoo.webp" class="d-block w-100" alt="..." />
						<div class="carousel-caption d-none d-md-block">
							<h1>SALUD</h1>
							<h3>Conoce nuestras especialidades médicas para toda la familia</h3>
						</div>
					</div>
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
			<div class="card">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title">Dr. Ivan Herrera</h3>
					<p class="card-text">Especialidad: Cardiología.
						Formación Académica:
						Médico Cirujano, Universidad Nacional Autónoma de México (UNAM)
						Especialidad en Cardiología, Instituto Nacional de Cardiología Ignacio Chávez
						Diplomado en Intervencionismo Cardiovascular, Universidad de Barcelona.
						"El corazón es el motor de la vida, mi misión es mantenerlo latiendo fuerte y sano."
					</p>
					<a href="#" class="btn btn-outline-primary">AGENDAR CITA</a>
				</div>
			</div>
			<div class="card card">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title">Dr. Maikel Gómez</h3>
					<p class="card-text">Especialidad: Pediatría.
						Formación Académica:
						Médico Cirujano, Universidad de Buenos Aires (UBA)
						Residencia en Pediatría, Hospital Infantil Garrahan
						Curso Avanzado en Neonatología, Universidad de Harvard.
						"Los niños no solo necesitan cuidados médicos, sino también cariño y comprensión."
					</p>
					<a href="#" class="btn btn-outline-primary">AGENDAR CITA</a>
				</div>
			</div>
			<div class="card">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title">Dr. Andrés Torres</h3>
					<p class="card-text">Especialidad: Ortopedia y Traumatología.
						Formación Académica:
						Médico Cirujano, Pontificia Universidad Católica de Chile.
						Especialización en Ortopedia y Traumatología, Clínica Mayo, Estados Unidos.
						Certificación en Cirugía Artroscópica, Sociedad Internacional de Artroscopia.
						"Cada paso cuenta. Estoy aquí para ayudarte a recuperar tu movilidad y calidad de vida."</p>
					<a href="#" class="btn btn-outline-primary">AGENDAR CITA</a>
				</div>
			</div>
			<div class="card card">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title"> Dr. Joan Martínez</h3>
					<p class="card-text">Especialidad: Medicina y Cirugía Estética.
						Formación Académica:
						Médico Cirujano, Universidad de Milán.
						Especialización en Medicina Estética, Universidad de París.
						Máster en Cirugía Plástica y Reconstructiva, Universidad de Sao Paulo. "La belleza comienza con la confianza; mi objetivo es ayudarte a sentirte y verte mejor."</p>
					<a href="#" class="btn btn-outline-primary">AGENDAR CITA</a>
				</div>
			</div>

		</>
	);
};
