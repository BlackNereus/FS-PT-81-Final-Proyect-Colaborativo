const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: localStorage.getItem('token') || false,
			
		},
		actions: {

			getUserData: async () =>{try{

				const resp = await fetch(process.env.BACKEND_URL+'/api/protected',{
					method: 'GET',
					headers: {
						'Content-Type' : 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
					body: JSON.stringify(formData)
				})
				if(!resp.ok) throw new Error('Error registering')
				const data = await resp.json()
				console.log(data)
				localStorage.setItem('token', data.token)
				setStore({user: data.user})
			}
			catch (error){
				console.error(error)
			}
		},
			register: async formData => {

				try{

					const resp = await fetch(process.env.BACKEND_URL+'/api/',{
						method: 'POST',
						headers: {
							'Content-Type' : 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if(!resp.ok) throw new Error('Error registering')
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data.token)
					setStore({auth: true, token: data.token})
				}
				catch (error){
					console.error(error)
				}
			},

			login: async formData => {

				try{
					const resp = await fetch(process.env.BACKEND_URL+'/api/login',{
						method: 'POST',
						headers: {
							'Content-Type' : 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if(!resp.ok) throw new Error('Error registering')
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data.token)
					setStore({auth: true, token: data.token})
				}
				catch (error){
					console.error(error)
				}
			},

		}
	};
};

export default getState;
