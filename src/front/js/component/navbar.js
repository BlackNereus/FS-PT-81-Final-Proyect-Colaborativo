import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export const Navbar = () => {
	return (

		// <nav class="navbar navbar-expand-lg bg-body-tertiary">
		// 	<div class="container-fluid">
		// 		<a class="navbar-brand" href="#">Navbar</a>
		// 		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		// 			<span class="navbar-toggler-icon"></span>
		// 		</button>
		// 		<div class="collapse navbar-collapse" id="navbarNav">
		// 			<ul class="navbar-nav">
		// 				<li class="nav-item">
		// 					<a class="nav-link active" aria-current="page" href="#">Prices</a>
		// 				</li>
		// 				<li class="nav-item">
		// 					<a class="nav-link" href="#">Functionabilities</a>
		// 				</li>
		// 				<li class="nav-item">
		// 					<a class="nav-link" href="#">Contact</a>
		// 				</li>
		// 				<li class="nav-item">
		// 					<a class="nav-link" href="#">Noticies</a>
		// 				</li>
		// 			</ul>
		// 		</div>
		// 		</nav>


		 <nav class="navbar d-flex">
			<div class="container">
				<button class="btn-green">PRUEBA</button>
				<a className="nav-link active" style={{ color: "white" }} aria-current="#" href="#">Precio</a>
				<a className="nav-link" style={{ color: "white" }} href="#">Funcionabilidades</a>
				<a className="nav-link" style={{ color: "white" }} href="#">Contacto</a>
				<a className="nav-link" style={{ color: "white" }} href="#">Noticias</a>
			</div>
		</nav> 
	)
}
