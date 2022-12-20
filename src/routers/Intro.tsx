import styled from "styled-components";
import intro from "../assets/intro.png";

const Container = styled.div`
  position: relative;
  top: 50px;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Image = styled.img`
  width: calc(100vw + 4px);
  position: absolute;
  right: 0;
`;
export function Intro() {
  return (
    <Container>
      <Image src={intro} />
    </Container>
  );
}
