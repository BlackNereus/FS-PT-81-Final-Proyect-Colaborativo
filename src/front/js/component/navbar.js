import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export const Navbar = () => {
	return (
		
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid justify-content-center" style={{background: "#2C5364"}}>
				<a className="navbar-brand" href="#">Logo</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active" style={{color:"white"}} aria-current="page" href="#">Precio</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" style={{color:"white"}} href="#">Funcionabilidades</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" style={{color:"white"}} href="#">Contacto</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" style={{color:"white"}} href="#">Noticias</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)}
