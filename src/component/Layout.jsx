import { useLocation } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import MainHeader from "./MainHeader";


const Layout = ({ children }) => {
    const location = useLocation();

    let header;
    if (location.pathname === '/') header = <MainHeader />;
    if (location.pathname === '/login') header = <LoginHeader />;


    console.log(`${location.pathname === '/login'}`)

    return (
        <div
            style={{
                width: "1200px",   // 고정 너비
                margin: "0 auto",  // 가운데 정렬
            }}
        >
            {header}
            <main>{children}</main>
        </div>
    )

};

export default Layout;

