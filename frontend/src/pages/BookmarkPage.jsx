import react, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Bookmark, BookmarkAdded, BookmarkAddedOutlined, BookmarkAddOutlined } from "@mui/icons-material";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useUser } from "../UserContext";
import { patchBookamrk } from "../api/BookmarkApi";
import { getWordByIds } from "../api/WordApi";

const BookmarkPage = () => {
    const [bookmarkwords, setBookmarkWords] = useState([]);
    const [currentWords, setCurrentWords] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchBookmarks  = async () => {
            if (!user) return;

            try {
                const result = await patchBookamrk(user.id);
                const userWords = result.bookmarks.result || [];
                const wordIds = userWords.map((w) => w.word_id);
                console.log('wordIds =>',wordIds);

                const res = await getWordByIds(wordIds);
                console.log('res =>', res.data);

                setBookmarkWords(res.data); 
                setCurrentWords(res.data)
            } catch (error) {
                console.error("fetchBookmarks  error!!", error);
            }
        };

        fetchBookmarks();
    }, [user]);


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
                {bookmarkwords.map((word, index) => (
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        border: '1px solid black',
                        marginBottom: '10px', marginTop: '10px',
                        paddingLeft: '20px', paddingRight: '20px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h3 style={{ marginRight: '10px' }}>{word.word}</h3>
                            <p>{word.ps}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <p style={{ marginRight: '40px' }}>{word.meaning}</p>
                            <h3><BookmarkAddedOutlined /></h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookmarkPage