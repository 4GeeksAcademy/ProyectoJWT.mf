
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

export const Private = () => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/login')
            return
        }

        axios.get('https://curly-space-rotary-phone-5gr6vxrq457pcvvrr-3001.app.github.dev/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setUser(res.data.user)
        })
        .catch(error => {
            localStorage.removeItem('token')
            navigate('/login')
        })
    },[])

    return (
        <>
            {user ? (
                <div>
                    <h1>Bienvenido {user.email}</h1>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/login')
                    }}>Log out</button>
                </div>
            ) : (
                <p>Loading...</p>
         )}
        </>
    )
}