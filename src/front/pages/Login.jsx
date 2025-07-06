
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async () => {
        try {
            const resp = await axios.post('https://curly-space-rotary-phone-5gr6vxrq457pcvvrr-3001.app.github.dev/api/login', {
                email,
                password
            })
            localStorage.setItem("token", resp.data.token)
            navigate('/private')
        } catch (error) {
            alert("Error logging in")
        }
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="mt-5">Login</h1>

                    <label className="mt-2 me-2" htmlFor="email">Enter your email</label>
                    <input type="email" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />


                    <label className="mt-2 me-2" htmlFor="password">Enter your password</label>
                    <input type="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />

                </div>
            </div>
            <div className="container-btn">

                <button className="btn btn-success mt-2 me-2" onClick={loginUser}>Enter</button>

            </div>
        </>
    )
}