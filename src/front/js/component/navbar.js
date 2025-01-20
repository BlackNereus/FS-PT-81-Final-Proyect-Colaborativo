import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export const Navbar = () => {
	return (

		

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
