import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, userIdState } from "../atom";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProfile } from "../api";

// import { useIntersectionObservation } from "./useIntersectionObserver";

const Container = styled.form`
  background-color: ${(props) => props.theme.white.lighter};
  height: 97%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  border: 1px solid #e0e0e0;
`;

const ProjectName = styled.span`
  border: none;
  display: block;
  margin: 30px auto;
  width: max-content;
  font-size: 25px;
  padding: 5px 0;
  font-weight: 600;
  text-align: center;
`;

const Member = styled.span`
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
  z-index: 10;
  background-color: ${(props) => props.theme.white.lighter};
  top: 0;
  padding-top: 10px;
  position: sticky;
  font-size: x-large;
  margin: 10px 0;
  padding-bottom: 5px;
  border-bottom: solid 2px ${(props) => props.theme.navy};
`;

const ViewerWrapper = styled.div`
  padding: 10px;
`;

interface IList {
  project_id: number;
  title: string;
  teammates: string[];
  teammates_name: string[];
  duration: string;
  introduction: string;
}
interface IData {
  project_list: IList[];
  user: {
    name: string;
    information: string;
  };
}

export function OnePager() {
  const data = useRecoilValue(categoryState);
  const userId = useRecoilValue(userIdState)
  const {projectId} = useParams()
  const {isLoading, data:profileData} = useQuery<IData>(
    ["project", userId],
    () => getProfile(userId),
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );
 
  
  // const rootRef = useRef<any>(null);
  // const [refState, setRefState] = useState(false); // 데이터가 로드되기전에 ref가 선언되어서 데이터가 로드된 후 재렌더링 해주기 위해 state를 선언함
  // const targetRef = useRef<any>([]);

  // useEffect(() => setRefState((curr) => !curr), []);
  // console.log("refState", refState);

  //intersection observer
  // useIntersectionObservation(rootRef, targetRef);

  return (
    <>
      <Container>
        <ProjectName></ProjectName>
        <Member></Member>
        {Object.keys(data).map((part) => (
          <Part key={part}>
            {data[part].map((topic, index) => (
              <Content key={topic.id}>
                <Topic>{topic.topic}</Topic>
                <ViewerWrapper className={topic.id + ""}>
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
