import { Button, Divider } from "@mui/material";
import React, { useState } from "react";

function Popup({ onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
             width: '100%', height: '100%',   // 화면 전체 덮게
            backgroundColor: '#88D9D9D9', // 반투명 배경
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                 backgroundColor: 'white',
                 padding : '20px',
                 display:'flex',
                 flexDirection : "column",
                justifyContent: 'center',
                alignItems: 'center'                

            }}>
                <h2>[!!]</h2>
                <p>로그인시 사용 가능한 기능 입니다</p>
                <Button onClick={onClose}>닫기</Button>
            </div>
        </div>
    )
}

export default Popup;
