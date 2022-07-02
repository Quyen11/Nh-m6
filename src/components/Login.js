import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import API from '../API'
import Button from "./Button";
import { Wrapper } from "./Login.styles";
import { Context } from "../context";

const Login = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);

    const [user, setUser] = useContext(Context);
    const navigate = useNavigate()

        const handleSubmit = async () => {
            setError(false)
            try {
                const requestToken = await API.getRequestToken();
                const sessionId = await API.authenticate(
                    requestToken,
                    username,
                    password
                )
                console.log(sessionId);
                setUser({ sessionId: sessionId.session_id, username })

                navigate('/')
            } catch(error) {
                setError(true)
            }

            }
        
        const handleInput = e => {
            const name = e.currentTarget.name;
            const value = e.currentTarget.value;

            if (name === "username") setUserName(value);
            if (name === "password") setPassword(value);
        }
          
        
        return(
        <Wrapper>
            {error && <div className="error">Invalid username or password</div>}
            <label>
                Username:
            </label>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleInput} />

            <input
                type="password"
                value= {password}
                name="password"
                onChange={handleInput}/>

            <Button text= 'Login ' callback={handleSubmit} /> 

        </Wrapper>

    )
}

export default Login