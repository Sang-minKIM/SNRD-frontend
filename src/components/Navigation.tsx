import { motion } from "framer-motion";
import { Link, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  min-width: 700px;
  background-color: #ffffff;
  width: 100vw;
  height: 40px;
  position: fixed;
  top: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Items = styled.ul`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2%;
`;

const Item = styled.li`
  position: relative;
  padding: 10px;
  color: ${(props) => props.theme.grey.darker};
  font-weight: 600;
`;

const Bar = styled(motion.span)`
  position: absolute;
  width: 40px;
  height: 3px;
  background-color: ${(props) => props.theme.navy};
  bottom: 3px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export default function Navigation() {
  const { projectId } = useParams();
  const mainMatch = useMatch(`/main/${projectId}`);
  const boardMatch = useMatch(`/boards/${projectId}`);

  return (
    <Nav>
      <Items>
        <Item>
          <Link to={`/main/${projectId}`}>
            메인{mainMatch && <Bar layoutId="bar" />}
          </Link>
        </Item>
        <Item>
          <Link to={`/boards/${projectId}`}>
            보드{boardMatch && <Bar layoutId="bar" />}
          </Link>
        </Item>
        {/* <Item>
          <Link to="/message">
            메모장{messageMatch && <Bar layoutId="bar" />}
          </Link>
        </Item> */}
      </Items>
    </Nav>
  );
}
