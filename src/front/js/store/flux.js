const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			companies: [],
			services: [],
			date: [],
			message: null,
			auth: localStorage.getItem('token') || false,
			token: null,
		},

		actions: {
			getUserData: async () => {
				try {

					const resp = await fetch(process.env.BACKEND_URL + '/api/protected', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
					})
					if (!resp.ok) throw new Error('Error registering')
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data.token)
					setStore({ user: data.user })
				}
				catch (error) {
					console.error(error)
				}
			},

			register: async formData => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error('Error registering')
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data.token)
					setStore({ auth: true, token: data.token })
					return true
				}
				catch (error) {
					console.error(error)
					return false
				}
			},
			getUsers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users')
					if (!response.ok) throw new Error("Error obteniendo usuarios");
					const data = await response.json();
					setStore({ users: data.data });
				} catch (error) {
					console.error("Error obteniendo usuarios:", error);
				}
			},

			getUserId: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users/' + id)
					if (!response.ok) throw new Error("Error obteniendo el id del Usuario");
					const data = await response.json();
					return data.user;
				} catch (error) {
					console.error("Error obteniendo el ID del usuario:", error);
				}
			},
			createUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || "Error creando al usuario");
					}

					const data = await response.json();
					const store = getStore();
					setStore({ users: [...store.users, data.user] });
					localStorage.setItem('token', data.token);
					setStore({ auth: true, token: data.token });
					return true;
				} catch (error) {
					console.error("Error creando usuario:", error);
					console.error("Detalles del error:", error.message); // Más detalles del error
					return false;
				}
			},
			deleteUser: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users/' + id, {
						method: "DELETE"
					});
					if (!response.ok) throw new Error("Error borrando al usuario");
					const store = getStore();
					setStore({ users: store.users.filter((user) => user.id !== id) });
				} catch (error) {
					console.error("Error Borrando al usuario:", error);

				}
			},
			updateUser: async (id, email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users/' + id, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) throw new Error("Error actualizando al usuario");
					const data = await response.json();
					const store = getStore();
					setStore({
						users: store.user.map((user) => user.id === id ? { ...user, ...data.user } : user),
					});
				} catch (error) {
					console.error("error actualizando al usuario");
				}
			},

			getCompany: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/company')
					if (!response.ok) throw new Error("Error obteniendo usuarios");
					const data = await response.json();
					setStore({ company: data.data });
				} catch (error) {
					console.error("Error obteniendo compañia:", error);
				}
			},
			getCompanyId: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/comany/' + id)
					if (!response.ok) throw new Error("Error obteniendo el id de la compañia");
					const data = await response.json();
					return data.user;
				} catch (error) {
					console.error("Error obteniendo el ID de la compañia:", error);
				}
			},
			CreateCompany: async (company) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/company', {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(company),

					});
					if (!response.ok) throw new Error("Error obteniendo usuarios");
					const data = await response.json();
					setStore({ companies: [...store.companies, data.data] });
				} catch (error) {
					console.error("Error creando la compañia:", error);
				}
			},
			updateCompany: async (id, updatedData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/comany/' + id, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(updatedData),
					});
					if (!response.ok) throw new Error("Error actualizando la compañia");

					const data = await response.json();
					const store = getStore();
					const updatedCompanies = store.companies.map((company) =>
						company.id === id ? data.company : company
					);
					setStore({ companies: updatedCompanies });
				} catch (error) {
					console.error("Error actualizando la compañia:", error);
				}
			},
			deleteCompany: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/comany/' + id, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Error borrando la compañia");

					const store = getStore();
					const updatedCompanies = store.companies.filter((company) => company.id !== id);
					setStore({ companies: updatedCompanies });
				} catch (error) {
					console.error("Error borrando la compañia:", error);
				}
			},

			getServices: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/service');
					if (!response.ok) throw new Error("Error fetching services");

					const data = await response.json();
					setStore({ services: data.data });
				} catch (error) {
					console.error("Error fetching services:", error);
				}
			},

			getServiceById: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/service/' + id);
					if (!response.ok) throw new Error("Error fetching service");

					const data = await response.json();
					setStore({ selectedService: data.servicio });
				} catch (error) {
					console.error("Error fetching service by ID:", error);
				}
			},

			createService: async (service) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/service', {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(service),
					});
					if (!response.ok) throw new Error("Error creating service");

					const data = await response.json();
					const store = getStore();
					setStore({ services: [...store.services, data.data] });
				} catch (error) {
					console.error("Error creating service:", error);
				}
			},

			updateService: async (id, updatedData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/service/' + id, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(updatedData),
					});
					if (!response.ok) throw new Error("Error updating service");

					const data = await response.json();
					const store = getStore();
					const updatedServices = store.services.map((service) =>
						service.id === id ? data.service : service
					);
					setStore({ services: updatedServices });
				} catch (error) {
					console.error("Error updating service:", error);
				}
			},

			deleteService: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/service/' + id, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Error deleting service");
					const store = getStore();
					const updatedServices = store.services.filter((service) => service.id !== id);
					setStore({ services: updatedServices });
				} catch (error) {
					console.error("Error deleting service:", error);
				}
			},


			getCitas: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/citas');
					if (!response.ok) throw new Error("Error obteniendo las citas");
					const data = await response.json();
					setStore({ citas: data.data });
				} catch (error) {
					console.error("Error obteniendo las citas:", error);
				}
			},

			getCitaById: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/citas/' + id);
					if (!response.ok) throw new Error("Error obteniendo la cita");
					const data = await response.json();
					setStore({ selectedCita: data.user });
				} catch (error) {
					console.error("Error obteniendo la cita por ID:", error);
				}
			},

			createCita: async (cita) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/citas', {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(cita),
					});
					if (!response.ok) throw new Error("Error creando la cita");
					const data = await response.json();
					const store = getStore();
					setStore({ citas: [...store.citas, data.data] });
				} catch (error) {
					console.error("Error creando la cita:", error);
				}
			},

			updateCita: async (id, updatedData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/citas/' + id, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(updatedData),
					});
					if (!response.ok) throw new Error("Error modificando la cita");
					const data = await response.json();
					const store = getStore();
					const updatedCitas = store.citas.map((cita) =>
						cita.id === id ? data.cita : cita
					);
					setStore({ citas: updatedCitas });
				} catch (error) {
					console.error("Error modificando la cita:", error);
				}
			},

			deleteCita: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/citas/' + id, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Error borrando la cita");
					const store = getStore();
					const updatedCitas = store.citas.filter((cita) => cita.id !== id);
					setStore({ citas: updatedCitas });
				} catch (error) {
					console.error("Error borrando la cita:", error);
				}
			},

			loginUser: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(formData),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || "Credenciales incorrectas");
					}

					const data = await response.json();

					// Guarda el token en localStorage y actualiza el estado global
					localStorage.setItem("token", data.token);
					setStore({ auth: true, token: data.token });

					return true; // Indica que el login fue exitoso
				} 
				catch (error) {
					console.error("Error durante el login:", error);
					return false; // Indica que el login falló
				}
			},


			verify: async (token) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/verify" + token, {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(formData),
					});

					if(!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || "Token incorrecto");
					}

					const data = await response.json();

					localStorage.setItem("token", data.token);
					getStore({auth: true, token: data.token});



					return true;
				}
				catch(error) {
					console.error("Error durante el verify", error);
					return false;
				}
			},
			logout: () => {
				localStorage.removeItem("token"); // Elimina el token del localStorage
				setStore({ auth: false, token: null }); // Actualiza el estado global
			  },
		},
	}
};


export default getState;
