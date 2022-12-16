import styled from "styled-components";

const H1 = styled.h1`
  margin-top: 150px;
  height: 50px;
  width: 100%;
  color: ${(props) => props.theme.navy};
`;

export function NotFound() {
  return <H1>죄송합니다. 페이지를 찾을 수 없습니다.</H1>;
}
