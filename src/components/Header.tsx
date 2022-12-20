import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import introBtn from "../assets/introBtn.svg";
import loginBtn from "../assets/loginBtn.svg";
import logoutBtn from "../assets/logoutBtn.svg";
import profileBtn from "../assets/profileBtn.svg";
import { useRecoilValue } from "recoil";
import { loginState, userIdState } from "../atom";

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
  color: white;
  padding: 0 10px;
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
const LinkBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const LinkSvg = styled.img`
  height: 25px;
`;

const LogSvg = styled(LinkSvg)`
  height: 20px;
  margin-bottom: 5px;
`;

const LogoutSvg = styled(LinkSvg)`
  margin-bottom: 5.5px;
  height: 18px;
`;

const ProfileSvg = styled(LinkSvg)`
  height: 20px;
  margin-bottom: 7px;
`;

// const Overlay = styled.div`
//   background-color: transparent;
//   width: 100%;
//   height: 100vh;
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   bottom: 0;
//   z-index: 20;
// `;

function Header() {
  const isLoggedin = useRecoilValue(loginState);
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const { isLoading: userLoading, data: userData } = useQuery(["user"], () =>
  //   getUser(userId)
  // );
  // let isLoading = userLoading;

  const profileMatch = useMatch("/profile/:userId");
  const loginMatch = useMatch("/login");
  const joinMatch = useMatch("/join");
  const introMatch = useMatch("/");
  const projectMatch = useMatch("/main/:projectId");
  const boardMatch = useMatch("/boards/:projectId");
  return (
    <>
      <Nav>
        <Col>
          <Logo src={logo} />
        </Col>
        <Items>
          {introMatch && isLoggedin ? (
            <Item>
              <LinkBtn to={`/profile/${userId}`}>
                <ProfileSvg src={profileBtn} />
              </LinkBtn>
            </Item>
          ) : null}
          {introMatch ? null : (
            <Item>
              <LinkBtn to="/">
                <LinkSvg src={introBtn} />
              </LinkBtn>
            </Item>
          )}

          {projectMatch || boardMatch ? (
            <>
              <Item>
                <LinkBtn to={`/profile/${userId}`}>
                  <ProfileSvg src={profileBtn} />
                </LinkBtn>
              </Item>
            </>
          ) : null}
          {loginMatch ? null : isLoggedin ? (
            <Item>
              <LinkBtn to="/logout">
                <LogoutSvg src={logoutBtn} />
              </LinkBtn>
            </Item>
          ) : (
            <Item>
              <LinkBtn to="/login">
                <LogSvg src={loginBtn} />
              </LinkBtn>
            </Item>
          )}
        </Items>
      </Nav>
      {/* {isMenuOpen ? (
        <>
          <Overlay onClick={() => setIsMenuOpen(false)}></Overlay>
          <ProjectList>
            <ProjectLabel>{userData?.username}의 프로젝트</ProjectLabel>
            {isLoading
              ? null
              : projectData.map((project: IProject) => (
                  <ProjectLink to="null">{project.title}</ProjectLink>
                ))}
          </ProjectList>
        </>
      ) : null} */}
    </>
  );
}

export default Header;
