import styled from "styled-components";
import notFound from "../assets/404.svg";

const Image = styled.img`
  position: fixed;
  width: 100vw;
  z-index: -1;
`;

export function NotFound() {
  return <Image src={notFound} />;
}
