import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Link,
  useMatch,
  useMatches,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.svg";

const Nav = styled.nav`
  min-width: 870px;
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  height: 50px;
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
  padding-top: 5px;
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
  height: 50px;
  margin-bottom: 1px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 170px;
  z-index: 21;

  height: 240px;

  right: 70px;
  top: 55px;
  position: absolute;
  background: ${(props) => props.theme.white.lighter};
  border-radius: 0.4em;
  border: 1px solid #cfd7dd;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${(props) => props.theme.white.lighter};
    border-top: 0;
    margin-left: -10px;
    margin-top: -10px;
  }
`;

const ProjectLabel = styled.div`
  width: 100%;
  height: 50px;
`;

const ProjectLink = styled(Link)`
  height: 30px;
  width: 100%;

  display: flex;
  padding-left: 15px;
  justify-content: flex-start;
  align-items: center;
`;

const Overlay = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  z-index: 20;
`;

interface IProject {
  id: number;
  title: string;
  teammates: string[];
  duration: string[];
  introduction: string;
}

function Header() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const { isLoading: userLoading, data: userData } = useQuery(["user"], () =>
  //   getUser(userId)
  // );
  // let isLoading = userLoading;
  const profileMatch = useMatch("/profile/:id");
  const loginMatch = useMatch("/login");
  const joinMatch = useMatch("/join");
  const introMatch = useMatch("/");
  const projectMatch = useMatch("/main/:projectId");
  const boardMatch = useMatch("/board/:projectId");
  return (
    <>
      <Nav>
        <Col>
          <Logo src={logo} />
        </Col>
        <Items>
          <Item>
            <Link to="">소개</Link>
          </Item>
          {projectMatch || boardMatch ? (
            <>
              <Item>
                <Link to="profile/:id">프로필</Link>
              </Item>
            </>
          ) : null}
          {loginMatch || introMatch || joinMatch ? null : isLoggedin ? (
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
      {isMenuOpen ? (
        <>
          <Overlay onClick={() => setIsMenuOpen(false)}></Overlay>
          <ProjectList>
            {/* <ProjectLabel>{userData?.username}의 프로젝트</ProjectLabel>
            {isLoading
              ? null
              : projectData.map((project: IProject) => (
                  <ProjectLink to="null">{project.title}</ProjectLink>
                ))} */}
          </ProjectList>
        </>
      ) : null}
    </>
  );
}

export default Header;
