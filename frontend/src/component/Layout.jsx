import { useLocation } from "react-router-dom";
import SignupHeader from "./SignupHeader";
import LoginHeader from "./LoginHeader"
import MainHeader from "./MainHeader";


const Layout = ({ children }) => {
    const location = useLocation();

    let header;
    if (location.pathname === '/' || location.pathname === '/bookmark') header = <MainHeader />;
    if (location.pathname === '/signup') header = <SignupHeader />;
    if (location.pathname === '/login') header = <LoginHeader />;

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

