import react from "react";
import { FaSearch } from "react-icons/fa";
import { Bookmark, BookmarkAdded, BookmarkAddedOutlined, BookmarkAddOutlined } from "@mui/icons-material";
import { BsBookmarkCheckFill } from "react-icons/bs";

const BookmarkPage = () => {
    const testItems = ['one', 'two', 'three', 'four', 'five']
    return (
        <div style={{ margin: '0px 20px 0px 20px' }}>
            <div style={{ position: 'relative' }}>
                <h2>All bookmarks</h2>

                <input style={{
                    marginTop: '20px', width: '94.5%', padding: '20px', paddingLeft: '40px'
                }}
                    placeholder="Search">
                </input>
                <FaSearch style={{ position: 'absolute', top: '72%', left: '15px', color: "#888" }}></FaSearch>

            </div>

            <div style={{ marginTop: '80px' }}>
                {testItems.map((num, index) => (
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        border: '1px solid black',
                        marginBottom: '10px', marginTop: '10px',
                        paddingLeft: '20px', paddingRight: '20px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h3 style={{ marginRight: '10px' }}>{num}</h3>
                            <p>test</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <p style={{ marginRight: '40px' }}>테스트 메시지 단어 뜻</p>
                            <h3><BookmarkAddedOutlined /></h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookmarkPage