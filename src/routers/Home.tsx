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
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 40px;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  margin-top: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const Categories = styled.div`
  height: 90%;
  width: 23%;
  background-color: ${(props) => props.theme.white.darker};
  margin-top: 3%;
`;

const Category = styled.div``;

const Contents = styled.form`
  background-color: ${(props) => props.theme.white.darker};
  height: 90%;
  width: 40%;
  margin-top: 3%;
`;

const Topic = styled.h3``;

const Content = styled.input``;

const Comments = styled.form`
  height: 90%;
  width: 23%;
  background-color: ${(props) => props.theme.white.darker};
  margin-top: 3%;
`;

const Comment = styled.div``;

const CommentInput = styled.input``;

function Home() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  return (
    <>
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
      <Wrapper>
        <Categories></Categories>
        <Contents></Contents>
        <Comments></Comments>
      </Wrapper>
    </>
  );
}
export default Home;
