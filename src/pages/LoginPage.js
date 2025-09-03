import { Button } from "@mui/material";
import { useState } from "react";

const LoginPage = () => {
    const [inputText, setInputText] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = (e) => e.target;
        setInputText((prev) => ({
            ...prev,
            [name]: value
        }))
        setInputText(e.target.value);
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

            <div style={{ display: 'flex', alignItems: 'center' ,marginBottom: '30px'}}>
                <p>Don’t have and account yet? </p>
                <nav>
                    <Button href="/login" style={{
                        margin: '0 20px', color: 'blue',
                    }}> Sign up now</Button>
                </nav>
            </div>

            <input type='text'
                value={inputText.nickname}
                onChange={handleChange}
                placeholder="email"
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

            }}>Log in</Button>
        </div>
    )
}

export default LoginPage