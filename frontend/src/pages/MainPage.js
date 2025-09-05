import { Bookmark, BookmarkAddOutlined } from "@mui/icons-material";
import react from "react";
import { FaBeer } from "react-icons/fa";

const MainPage = () => {
    return (
        <div style={{ margin: '0px 20px 0px 20px' }}>

            <h2>오늘의 BBC English 추천 단어</h2>
            <p>
                <a href="https://www.bbc.co.uk/learningenglish" target="_blank" rel='noopener noreferrer'
                    style={{ fontSize: '12px' }}>
                    [BBC 원본 확인하기]</a>
            </p>


            <div style={{ backgroundColor: 'lightgray' }}>
                 <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20'
                    }}>
                        <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>TestWord</h3>
                        <p>명사</p>
                    </div>
                    <h3 style={{marginRight : '20px'}}><BookmarkAddOutlined /></h3>


                </div>

                <div style={{
                    display: 'flex',
                    marginLeft: '100px',
                    marginRight: '100px',
                    flexDirection: 'row',
                    gap: '20',
                    alignContent: 'center',
                    justifyContent: 'space-between'
                }}>
                    <p style={{ marginRight: '10px' }}>테스트 단어_1</p>
                    <p style={{ marginRight: '10px' }}>테스트 단어_2</p>
                    <p style={{ marginRight: '10px' }}>테스트 단어_3</p>
                    <p style={{ marginRight: '10px' }}>테스트 단어_4</p>
                </div>
            </div>

            <hr style={{ marginTop: '50px', marginBottom: '50px' }}></hr>

            <h2>오늘의 Reuters 추천 단어</h2>
            <p>
                <a href="https://www.reuters.com/" target="_blank" rel='noopener noreferrer'
                    style={{ fontSize: '12px' }}>
                    [Reuters 원본 확인하기]</a>
            </p>

            <div style={{ backgroundColor: 'lightgray' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20'
                    }}>
                        <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>TestWord</h3>
                        <p>명사</p>
                    </div>
                    <h3 style={{marginRight : '20px'}}><BookmarkAddOutlined /></h3>


                </div>

                <div style={{
                    display: 'flex',
                    marginLeft: '100px',
                    marginRight: '100px',
                    flexDirection: 'row',
                    gap: '20',
                    alignContent: 'center',
                    justifyContent: 'space-between'
                }}>
                    <p style={{ marginRight: '10px' }}>테스트 단어_1</p>
                    <p style={{ marginRight: '10px' }}>테스트 단어_2</p>
                    <p style={{ marginRight: '10px' }}>테스트 단어_3</p>
                    <p style={{ marginRight: '10px' }}>테스트 단어_4</p>
                </div>
            </div>
        </div>

    )
}

export default MainPage
