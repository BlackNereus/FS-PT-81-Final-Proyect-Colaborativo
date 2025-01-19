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
						<img src="https://www.peluker.com/blog/wp-content/uploads/2024/04/image106innovacion-en-diseno-mobiliario-de-peluqueria-de-alta-gama.jpg" class="d-block w-100" alt="..."/>
							<div class="carousel-caption d-none d-md-block">
								<h1>BIENVENIDO A CLINICA CENTRO</h1>
								<p>Tu salud es nuetra responsabilidad</p>
							</div>
					</div>
					<div class="carousel-item">
						<img src="https://www.peluker.com/blog/wp-content/uploads/2024/04/image114innovacion-en-diseno-mobiliario-de-peluqueria-de-alta-gama-1536x768.jpg" class="d-block w-100" alt="..."/>
							<div class="carousel-caption d-none d-md-block">
								<h2>Experiencia y tecnoligia</h2>
								<p>Bla bla bla bla . . .</p>
							</div>
					</div>
					<div class="carousel-item">
						<img src="https://www.peluker.com/blog/wp-content/uploads/2024/04/image104innovacion-en-diseno-mobiliario-de-peluqueria-de-alta-gama-1536x768.jpg" class="d-block w-100" alt="..."/>
							<div class="carousel-caption d-none d-md-block">
								<h2>C H U P A C A B R A</h2>
								<p>wqerty qwrewqrt wqe qwrttqer qwrtqwt wqrtqt</p>
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
					<h3 class="card-title">SERVICIO DE CORTE</h3>
					<p class="card-text">Andres “Andy” Cortéz - El Estilista Visionario. Andy es el barbero que combina su destreza con la tecnología. Con más de 10 años de experiencia en el mundo de la barbería, Andy no solo tiene un ojo clínico para los cortes clásicos, sino que también es un apasionado de la innovación. Siempre está a la vanguardia de las tendencias, fusionando técnicas tradicionales con nuevas herramientas digitales para crear estilos personalizados. Además, como desarrollador de software, se asegura de que cada uno de sus clientes tenga una experiencia fluida y moderna, tanto en su servicio como en la interacción con la tecnología en la barbería.</p>
					<a href="#" class="btn btn-outline-danger">Agendar Cita con Andy</a>
				</div>
			</div>
			<div class="card card text-end">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title">SERVICIO DE ARREGLO DE BARBA Y BIGOTE</h3>
					<p class="card-text">Maikel “Rico” Fernández - El Barbero del Estilo y la Perfección. Maikel es el experto en barba y bigote que todos buscan. Con un toque preciso y una técnica refinada, es capaz de transformar cualquier barba desordenada en una obra de arte. Su experiencia de más de 8 años en el cuidado masculino lo convierte en el líder en diseño y mantenimiento de barba. Además, su enfoque tecnológico lo lleva a usar dispositivos de vanguardia para asegurarse de que cada corte sea perfecto y duradero. Maikel también integra herramientas digitales para que cada cliente tenga un seguimiento personalizado de su progreso de barba.</p>
					<a href="#" class="btn btn-outline-danger">Agendar Cita con Maikel</a>
				</div>
			</div>
			<div class="card">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title">SERVICIO DE COLOR</h3>
					<p class="card-text">Ivan “Tico” Díaz - El maestro del Color y Estilo. Ivan es un experto en el arte del color y el diseño capilar. Con una formación en cosmetología avanzada y una pasión por la moda, es conocido por transformar cada corte en una obra de arte, siempre adaptándose a las últimas tendencias. Además, su enfoque en la personalización de colores y cortes hace que cada cliente salga de su silla con una sensación única. Como parte del equipo de desarrollo de software, también ha implementado un sistema de consulta digital para elegir el color perfecto para cada tipo de cabello, todo desde la comodidad de tu móvil.</p>
					<a href="#" class="btn btn-outline-danger">Agendar Cita con Ivan</a>
				</div>
			</div>
			<div class="card card text-end">
				<div class="card-header">

				</div>
				<div class="card-body">
					<h3 class="card-title">SERVICIO DE MASAJES RELAJANTES</h3>
					<p class="card-text">Joan “Jota” Gómez - El Liberador de Tensiones. Jota es un profesional integral que sabe cómo equilibrar el arte del corte con el bienestar total del cliente. Además de ser un barbero experto, Jota es el encargado de los masajes relajantes en la barbería. Con formación en terapias de relajación y técnicas de alivio de tensiones, Jota asegura que cada cliente no solo se vea bien, sino que también se sienta increíble. Su habilidad para detectar puntos de tensión y proporcionar masajes restauradores hace que cada visita a la barbería sea una experiencia revitalizante, tanto para el cuerpo como para la mente.</p>
					<a href="#" class="btn btn-outline-danger">Agendar Cita con Jota</a>
				</div>
			</div>

		</>
	);
};
