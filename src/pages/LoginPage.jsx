import { Button, MenuItem, Select } from "@mui/material";
import react, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LoginPage = () => {
    const [inputText, setInputText] = useState({
        email: '',
        nickname: '',
        purpose: '',
        password: '',
        passwordcheck: '',
    });
    const handleChange = (e) => {
        const { name, value } = (e) => e.target;
        setInputText((prev) => ({
            ...prev,
            [name]: value
        }))
        setInputText(e.target.value);
    }

    //level 스피너 관련 const
    const [selectedLevelOption, setSelectedLevelOption] = useState('');
    const handelSelectedLevelOption = (e) => {
        setSelectedLevelOption(e.target.value);
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
            <input type='text'
                value={inputText.email}
                onChange={handleChange}
                placeholder="email"
                style={{
                    marginTop: '30px',
                    marginBottom: '20px',
                    padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <input type='text'
                value={inputText.nickname}
                onChange={handleChange}
                placeholder="nick name"
                style={{
                    marginBottom: '25px', padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <input type='text'
                value={inputText.purpose}
                onChange={handleChange}
                placeholder="purpose    ex) toeic"
                style={{
                    marginBottom: '25px',
                    padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <input type='text'
                value={inputText.password}
                onChange={handleChange}
                placeholder="password"
                style={{
                    marginBottom: '25px', padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <input type='text'
                value={inputText.passwordcheck}
                onChange={handleChange}
                placeholder="password check"
                style={{
                    marginBottom: '25px', padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <Select
                displayEmpty
                value={selectedLevelOption}
                onChange={(e) => setSelectedLevelOption(e.target.value)}
                variant="standard"
                style={{
                    color: "gray",
                    border: '2px solid black',
                    borderRadius: '10px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingLeft: '20px'
                }}
                disableUnderline
                renderValue={(value) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "690px",
                                fontSize: '14px',
                            }}
                        >
                            <span>{value || "level"}</span>
                        </div>
                    );
                }}
            >
                <MenuItem value="초급">초급</MenuItem>
                <MenuItem value="중급">중급</MenuItem>
                <MenuItem value="고급">고급</MenuItem>
            </Select>

            <Button style={{
                border: '1px solid black',
                color: "black",
                marginTop: '60px',
                width: '200px',
                padding: '15px'

            }}>Signup</Button>
        </div>
    )
}

export default LoginPage
