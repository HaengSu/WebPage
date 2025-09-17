import { BookmarkAddedOutlined, BookmarkAddOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { extractWord, saveWord } from "../api/WordApi";
import { patchBookamrk, updateBookamrk } from "../api/BookmarkApi";
import { useUser } from "../UserContext";
import { Button, CircularProgress } from "@mui/material";
import data from "../component/words.json"
import Popup from "../component/Popup";

const MainPage = (refreshKey) => {
  const [BBCWords, setBBCWords] = useState([]);
  const [BBCIndex, setBBCIndex] = useState(0);
  const [TIMESWords, setTIMESWords] = useState([]);
  const [TIMESIndex, setTIMESIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkWords, setBookmarkWords] = useState([]);
  const [localBookmarks, setLocalBookmarks] = useState([]);

  // const [loadingBBC, setLoadingBBC] = useState(true);
  // const [loadingTimes, setLoadingTimes] = useState(true);


  const { user } = useUser();
  const BBC = "https://www.bbc.com/news";
  const TIMES = "https://www.nytimes.com/";

  // test
  const [loadingBBC, setLoadingBBC] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  useEffect(() => {
    setBBCWords(data.words);
  })
  // test

  const handleOpen = () => {
    if (!isLoggedIn) {
      setShowPopup(true);   // 로그인 안 돼 있으면 팝업만 열기
    } else {

    }
  };


  const compareBookmark = () => {

  }

  useEffect(() => {
    setIsLoggedIn(user != null);
  }, [user]);

  // useEffect(() => {
  //   setLoadingTimes(true);
  //   setLoadingBBC(true);
  //   extractWord(BBC, user?.level || "초급", user?.purpose || "토익")
  //     .then((res) => {
  //       console.log("BBC 응답 =", res);
  //       setBBCWords(res.words); 
  // patchBookamrk(user.id || 1).then((res) => {
  //   console.log(`user id = ${user.id}`,res.bookmarks);
  // }).catch((err) => {
  //   console.error(`❌ occurred error!! ${err}`);
  // })
  //     })
  //     .catch((err) => {
  //       console.error(`BBC 크롤링 실패 : ${err}`);
  //     })
  //     .finally(() => {
  //       setLoadingBBC(false);
  //     });

  //   extractWord(TIMES, user?.level || "초급", user?.purpose || "토익")
  //     .then((res) => {
  //       console.log("TIMES 응답 =", res);
  //       setTIMESWords(res.words);
  //     })
  //     .catch((err) => {
  //   console.error("❌ TIMES 크롤링 실패:", err);
  // })
  //     .finally(() => {
  //       setLoadingTimes(false);
  //     });
  // }, [refreshKey]);

  async function hadleSaveWord(word) {
    try {
      const resSaveWord = await saveWord(word);
      console.log('resSaveWord = ', resSaveWord.data);

      const wordId = resSaveWord.data.id;
      const bookmarkInfo = {
        user_id: user.id,
        word_id: wordId
      }
      const resBookmarkWord = await updateBookamrk(bookmarkInfo)

      setLocalBookmarks(word.word);

      return {
        success: true,
        message: resBookmarkWord.message
      };
    } catch (error) {
      console.error(`❌ occurred error!! `, error);
      return {
        success : false,
        message : error.message
      };
    }
  }

  function handleBookmarks() {
    
  }


  const renderWordCard = (words, index, setIndex, title, link, loading) => (
    <div style={{ marginBottom: "50px" }}>
      <h2>오늘의 {title} 추천 단어</h2>
      <p>
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px" }}>
          [{title} 원본 확인하기]
        </a>
      </p>

      <div style={{ backgroundColor: "lightgray", padding: "20px" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <CircularProgress />
          </div>
        ) : words.length > 0 ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <h2 style={{ margin: "0 10px" }}>{words[index].word}</h2>
                <p style={{ marginTop: "30px" }}>{words[index].ps}</p>
              </div>

              <h3 style={{ marginRight: "20px" }} onClick={async () => {
                if (user == null) {
                  handleOpen();
                } else {
                  const word = {
                    level: `${user.level}`,
                    source: `${title.replace(/ /g, "")}`,
                    word: `${words[index].word}`,
                    ps: `${words[index].ps}`,
                    meaning: `${words[index].meanings.join(",")}`
                  }

                  const res = await hadleSaveWord(word);
                  console.log('res =>',res);
                  if (res.success == true) {
                    setIsBookmarked(true);
                    alert('북마크에 추가되었습니다.');

                  } else {
                    alert(`${res.message}`);
                  }
                }
              }}>
                {isBookmarked ? <BookmarkAddedOutlined /> : <BookmarkAddOutlined />}

              </h3>

            </div>

            <div
              style={{
                display: "flex",
                margin: "20px 100px",
                justifyContent: "space-between",
              }}
            >
              {words[index].meanings.map((m, i) => (
                <p key={i} style={{ marginRight: "10px" }}>
                  {m}
                </p>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  border: "1px solid black",
                  color: "black",
                  margin: "30px 100px 30px 0",
                  width: "200px",
                  background: "white",
                  padding: "15px",
                }}

                onClick={() => {
                  if (index === 0) return;
                  setIndex(index - 1);

                  handleBookmarks();
                }}
              >
                이전
              </Button>

              <Button
                style={{
                  border: "1px solid black",
                  color: "black",
                  margin: "30px 0 30px 100px",
                  width: "200px",
                  background: "white",
                  padding: "15px",
                }}
                onClick={() => {
                  if (index === words.length - 1) return;
                  setIndex(index + 1);
                }}
              >
                다음
              </Button>
            </div>
          </>
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );

  return (
    <div style={{ margin: "0px 20px" }}>
      {renderWordCard(BBCWords, BBCIndex, setBBCIndex, "BBC News", BBC, loadingBBC)}
      {renderWordCard(TIMESWords, TIMESIndex, setTIMESIndex, "NY Times", TIMES, loadingTimes)}
    </div>
  );
};

export default MainPage;
