import styled from "styled-components";
import intro from "../assets/intro.svg";

const Image = styled.img`
  width: 100vw;
  overflow-y: scroll;
  margin-top: 50px;
`;
export function Intro() {
  return (
    <>
      <Image src={intro} />
    </>
  );
}
