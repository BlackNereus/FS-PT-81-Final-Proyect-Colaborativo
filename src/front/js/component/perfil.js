import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  console.log( store.users);
  const [userData, setUserData] = useState({
    lastname: "",
    name: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (!store.user) {
          await actions.getUserData();
        }
        // Verificar nuevamente si store.user existe después de la llamada
        if (store.user) {
          setUserData({
            name: store.user.name,
            lastname: store.user.lastname,
          });
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    loadData();
  }, [store.user]);

  console.log(store.user)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="container mt-5">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>LastName</label>
          <input
            type="lastname"
            className="form-control"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" onClick={() =>{handleSubmit}}>
          Actualizar
        </button>
      </form>
    </div>
  );
};