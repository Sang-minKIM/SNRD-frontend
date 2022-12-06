import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const Nav = styled.nav`
  min-width: 870px;
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.navy};
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.1);
`;

const Items = styled.ul`
  height: 100%;
  width: 30%;
  justify-content: flex-end;
  display: flex;
  align-items: flex-start;
  padding-right: 10px;
  padding-top: 10px;
`;

const Item = styled.li`
  padding: 10px;
  color: white;
`;

const Col = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const Logo = styled.img`
  width: 138px;
  height: 35px;
  margin-bottom: 1px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

function Header() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  return (
    <Nav>
      <Col>
        <Logo src={logo} onClick={() => navigate("/")} />
      </Col>
      <Items>
        <Item>
          <Link to="">소개</Link>
        </Item>
        <Item>
          <Link to="/">프로젝트</Link>
        </Item>
        <Item>
          <Link to="profile/:id">프로필</Link>
        </Item>
        {isLoggedin ? (
          <Item>
            <Link to="logout">로그아웃</Link>
          </Item>
        ) : (
          <Item>
            <Link to="login">로그인</Link>
          </Item>
        )}
      </Items>
    </Nav>
  );
}

export default Header;
