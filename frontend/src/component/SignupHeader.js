import React, { use, useState } from "react";
import '../style.css';
import { Select, MenuItem, Button } from "@mui/material";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";



function SignupHeader() {
    const navigate = useNavigate();

    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            color: 'black'
        }}
        >
            <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>PICKAWORD</h1>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <p>Already have an account? </p>
                <nav>
                    <Button href="/login" style={{
                        margin: '0 20px', color: 'blue'
                    }}>Log in</Button>
                </nav>
            </div>

        </header>
    );
}

export default SignupHeader;