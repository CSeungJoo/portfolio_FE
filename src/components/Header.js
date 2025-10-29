import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({nickname}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setMenuOpen(false);
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <span className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        {nickname}.PORTFOLIO
      </span>

      <nav className="nav-links">
        <ul>
          <li>
            <a href={`#profile`}>PROFILE</a>
          </li>
          <li>
            <a href={`#skills`}>SKILLS</a>
          </li>
          <li>
            <a href={`#projects`}>PROJECTS</a>
          </li>
          <li>
            <a href={`#awards`}>AWARDS</a>
          </li>
        </ul>
      </nav>

      <div className="auth-links">
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/admin")} className="auth-btn">
              관리
            </button>
            <button onClick={handleLogout} className="auth-btn logout">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="auth-btn">
              로그인
            </button>
            <button onClick={() => navigate("/register")} className="auth-btn primary">
              회원가입
            </button>
          </>
        )}
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={toggleMenu}></div>
          <div className="mobile-menu">
            <button className="close-menu" onClick={toggleMenu}>✕</button>
            <ul>
              <li><a href={`#profile`} onClick={toggleMenu}>PROFILE</a></li>
              <li><a href={`#skills`} onClick={toggleMenu}>SKILLS</a></li>
              <li><a href={`#projects`} onClick={toggleMenu}>PROJECTS</a></li>
              <li><a href={`#awards`} onClick={toggleMenu}>AWARDS</a></li>
              <li className="divider"></li>
              {isLoggedIn ? (
                <>
                  <li><button onClick={() => { navigate("/admin"); setMenuOpen(false); }}>관리</button></li>
                  <li><button onClick={handleLogout}>로그아웃</button></li>
                </>
              ) : (
                <>
                  <li><button onClick={() => { navigate("/login"); setMenuOpen(false); }}>로그인</button></li>
                  <li><button onClick={() => { navigate("/register"); setMenuOpen(false); }}>회원가입</button></li>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
