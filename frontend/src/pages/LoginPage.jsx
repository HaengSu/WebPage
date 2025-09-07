import { Button, emphasize } from "@mui/material";
import { useState } from "react";
import { loginUser, registerUser } from '../api/userApi';
import { useUser } from '../UserContext';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { setUser } = useUser();
    const navigation = useNavigate();
    const [inputText, setInputText] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputText((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h2>
                Welcome to PickAWord
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <p>Don’t have and account yet? </p>
                <nav>
                    <Button href="/signup" style={{
                        margin: '0 20px', color: 'blue',
                    }}> Sign up now</Button>
                </nav>
            </div>

            <input type='text'
                value={inputText.nickname}
                onChange={handleChange}
                name="email"
                placeholder="email"
                maxLength={40}
                style={{
                    marginBottom: '30px', padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            ></input>

            <input type='text'
                value={inputText.nickname}
                onChange={handleChange}
                name="password"
                placeholder="password"
                style={{
                    marginBottom: '25px', padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            ></input>

            <Button style={{
                border: '1px solid black',
                color: "black",
                marginTop: '60px',
                width: '200px',
                padding: '15px'
            }}
                onClick={() => {
                    const user = {
                        email: inputText.email,
                        password: inputText.password
                    }

                    loginUser(user)
                        .then((result) => {
                            console.log('user = ', result.user);
                            setUser(result.user);
                            navigation('/');
                        })
                        .catch((err) => {
                            alert('로그인 실패 : ' + err.message);
                        }
                        )
                }}>Log in</Button>
        </div>
    )
}

export default LoginPage