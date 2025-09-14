// UserContext.js
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { checkUser } from "./api/AuthApi";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

   useEffect(() => {
    checkUser()
      .then(data => {
        if (data.loggedIn) {
          setUser(data.user); // 세션에 저장된 유저 정보 복구
        }
      })
      .catch(err => {
        console.error("세션 확인 실패:", err);
      });
  }, []); // 앱 최초 실행 시 1번만 실행됨

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext); 
}
