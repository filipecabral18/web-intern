import {createContext, useContext, useEffect, useState} from "react";
import { api } from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {
        try {
            const response = await api.post('/sessions', { email, password });
            console.log(response.data)
            const { user, token } = response.data;

            console.log(user, token)
            localStorage.setItem("@webintern:user", JSON.stringify(user));
            localStorage.setItem("@webintern:token", token);

            api.defaults.headers.common['Authorization'] = '' + token;
            setData({ user, token });

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('Erro de acesso');
            }
        }
    }

    function signOut(){
        localStorage.removeItem("@webintern:token");
        localStorage.removeItem("@webintern:user");

        setData({});

        window.location.replace("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("@webintern:token");
        const user = localStorage.getItem("@webintern:user");

        if (token && user ){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({
                token,
                user: JSON.parse(user)
            });
        }
    }, []);

    async function updateProfile({ user }) {
        try {
            console.log(user)
            await api.put(`/users/update/${user.id}`, { name: user.name, email: user.email });
            localStorage.setItem("@webintern:user", JSON.stringify(user));
            setData({
                user,
                token: data.token
            });
            alert("Perfil atualizado com sucesso")
        } catch (error) {
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert('Não foi possível atualizar o perfil');
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user: data.user,
            signOut,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    return useContext(AuthContext);
}

export {AuthProvider, useAuth};