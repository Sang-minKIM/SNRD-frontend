import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100px;
  justify-content: space-between;
  align-items: center;
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
`;

const Col = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-color: burlywood;
`;

const Title = styled.h2`
  font-size: 40px;
`;

function Header() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  return (
    <Nav>
      <Col>
        <Logo />
        <Title>수나롭다</Title>
      </Col>
      <Items>
        <Item>
          <Link to="">소개</Link>
        </Item>
        <Item>
          <Link to="/boards">작업목록</Link>
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
