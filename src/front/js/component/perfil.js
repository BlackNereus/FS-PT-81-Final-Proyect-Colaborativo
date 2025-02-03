import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Perfil = () => {
    const {store, actions} = useContext(Context);
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        password: ""
    });


    useEffect(() => {
        if(store.user){
            setUserData({
                email: store.user.email || "",
                name: store.user.name || "",
                password: store.user.password || "",

            })
        }
    }), [store.user]

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
}

