import React, { use, useState } from "react";
import '../style.css';
import { Select, MenuItem, Button } from "@mui/material";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";



function MainHeader() {
    const [selectedOption, setSelectedOption] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const handleOpen = () => {
        if (!isLoggedIn) {
            setShowPopup(true);   // 로그인 안 돼 있으면 팝업만 열고
            setOpen(false);       // 드롭다운은 막기
        } else {
            setOpen(true);        // 로그인 돼 있으면 드롭다운 열기 허용
        }
    };
    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            // backgroundColor : '#282c89',
            color: 'black'
        }}
        >
            <h1 onClick={() => navigate('/')} style={{cursor : 'pointer'}}>PICKAWORD</h1>
            {/* <h1 onClick={() => navigate('/bookmark')} style={{cursor : 'pointer'}}>PICKAWORD</h1> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Select
                    displayEmpty
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    variant="standard"
                    disableUnderline
                    open={open}
                    onOpen={() => {
                        if (isLoggedIn) {
                            setOpen(true);                // 로그인 상태면 열기
                        } else {
                            setShowPopup(true);           // 아니면 팝업 띄우기
                        }
                    }}
                    renderValue={(value) => {
                        if (value == '') {
                            return '난이도 변경';
                        }
                        return value;
                    }}>

                    <MenuItem value='Beginner'>초급</MenuItem>
                    <MenuItem value='Intermediate'>중급</MenuItem>
                    <MenuItem value='Advanced'>고급</MenuItem>
                </Select>
                <nav>
                    <Button href="/login" style={{ margin: '0 10px', color: 'black', border: '1px solid black', padding: '5px 30px' }}>Log In</Button>
                    <Button href="/signup" style={{ margin: '0 20px', color: 'black', border: '1px solid black', padding: '5px 25px' }}>Sign Up</Button>
                </nav>
                {showPopup && <Popup onClose={() => setShowPopup(false)} />}
            </div>

        </header>
    );
}

export default MainHeader;