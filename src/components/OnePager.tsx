import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, ICategoryState, infoState } from "../atom";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

const Container = styled.form`
  background-color: ${(props) => props.theme.white.lighter};
  height: 95%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  border: 1px solid #e0e0e0;
`;

const ProjectName = styled.input`
  border: none;
  display: block;
  margin: 30px auto;
  width: max-content;
  font-size: 25px;
  padding: 5px 0;
  font-weight: 600;
  text-align: center;
`;

const Member = styled.input`
  border: none;
  display: block;
  height: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin: 30px auto;
`;

const Part = styled.div`
  width: 100%;
  padding: 0 30px;
`;

const Content = styled.div``;

const Topic = styled.h1`
  font-size: x-large;
  margin: 5px 0;
`;

const ViewerWrapper = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.white.light};
`;

export function OnePager() {
  const info = useRecoilValue(infoState);
  const data = useRecoilValue(categoryState);
  console.log(data);

  return (
    <>
      <Container>
        <ProjectName placeholder={info.name} />
        <Member size={info.member.length + 10} placeholder={info.member} />
        {Object.keys(data).map((part) => (
          <Part key={part}>
            {data[part].map((topic) => (
              <Content key={topic.id}>
                <Topic>{topic.topic}</Topic>
                <ViewerWrapper>
                  <Viewer initialValue={topic.contents} />
                </ViewerWrapper>
              </Content>
            ))}
          </Part>
        ))}
      </Container>
    </>
  );
}
