
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendNewUser = async () => {
        try {
            const resp = await axios.post('https://curly-space-rotary-phone-5gr6vxrq457pcvvrr-3001.app.github.dev/api/signup', {
                email, password
            })
            alert('user created successfully')
            navigate('/login')
        } catch (error) {
            alert('Error registering' + error.response.data.msg)
        }
    }
        return (
            <>
                <div className="container">
                    <div className="row">

                        <h1 className="mt-5">Registro de usuario</h1>

                        <label className="mt-2" htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                        <label className="mt-2" htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                    </div>
                </div>
                <div className="container-btn mt-2">

                    <button className="btn btn-success mt-2 me-2" onClick={sendNewUser}>Save</button>

                </div>
            </>
        )
    }