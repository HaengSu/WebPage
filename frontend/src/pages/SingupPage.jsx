import { Button, MenuItem, Select } from "@mui/material";
import react, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { registerUser, getUsers } from '../api/userApi';



const SingupPage = () => {
    const [inputText, setInputText] = useState({
        email: '',
        nickname: '',
        purpose: '',
        password: '',
        passwordcheck: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputText((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //level 스피너 관련 const
    const [selectedLevelOption, setSelectedLevelOption] = useState('');
    const handelSelectedLevelOption = (e) => {
        setSelectedLevelOption(e.target.value);
    }

    // 비밀번호 검증
    const handleCheckPassword = () => {
        const password = inputText.password
        const confirmPasword = inputText.passwordcheck

        if (password == confirmPasword) {
            return true;
        } else {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
    }

    const handelCheckInputContent = () => {
        const email = inputText.email;
        const nickname = inputText.nickname;
        const purpose = inputText.purpose;
        const password = inputText.password;
        const confirmPasword = inputText.passwordcheck;
        const level = selectedLevelOption;
        console.log(`level = ${level}`)

        const res = !!(email && nickname && purpose && password && confirmPasword && level)
        if (res == false) {
            alert('회원가입을 위해 모든 정보를 입력해주세요.')
        }
        return res;
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
                name="email"
                maxLength={40}
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
                name="nickname"
                maxLength={19}
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
                name="purpose"
                placeholder="purpose    ex) toeic"
                maxLength={99}
                style={{
                    marginBottom: '25px',
                    padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <input type='password'
                value={inputText.password}
                onChange={handleChange}
                placeholder="password"
                name="password"
                maxLength={20}
                style={{
                    marginBottom: '25px', padding: '15px',
                    width: '700px',
                    border: '1px solid #BDBDBD',
                    borderRadius: '10px'
                }}
            >
            </input>

            <input type='password'
                value={inputText.passwordcheck}
                onChange={handleChange}
                placeholder="password check"
                name="passwordcheck"
                maxLength={20}
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
                padding: '15px',
            }}
                onClick={() => {
                    const checkInputContent = handelCheckInputContent();
                    const checkPassword = handleCheckPassword();
                    console.log(`checkInputContent = ${checkInputContent} // checkPasword = ${checkPassword}`)

                    if (checkInputContent == true && checkPassword == true) {
                        const user = {
                            email: inputText.email,
                            nickname: inputText.nickname,
                            purpose: inputText.purpose,
                            password: inputText.password,
                            level: selectedLevelOption,
                        }
                        const response = registerUser(user)
                            .then((res) => {
                                console.log(`회원가입 성공 : `,JSON.stringify(res, null, 2));
                            })
                            .catch((err) => {
                                console.error('회원가입 실패 :',err.message);
                                alert(`회원가입 실패 : ${err.message}`);
                            });
                    }

                }}>Signup</Button>
        </div>
    )
}

export default SingupPage
