const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			companies: [],
			services: [],
			date: []

		},
		actions: {
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
					const response = await fetch(process.env.BACKEND_URL + '/api/users', {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) throw new Error("Error creando al usuario");
					const data = await response.json;
					const store = getStore();
					setStore({ users: [...store.users, data.data] });
				} catch (error) {
					console.error("Error creando usuario:", error);
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
			CreateCompany: async (address, city, email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/company', {
						method: "POST",
						body: JSON.stringify(company),
						headers: { "Content-Type": "application/json" },
						body: ({address, city, email}),
					});
					if (!response.ok) throw new Error("Error obteniendo usuarios");
					const data = await response.json();
					setStore({ company: data.data }),
				} catch (error) {
					
				}
			},
		}
	};
};

export default getState;
