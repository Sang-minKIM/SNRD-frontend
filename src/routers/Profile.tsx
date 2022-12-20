import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getProfile } from "../api";
import editImg from "../assets/edit.svg";
import { emailState, newCardState } from "../atom";
import { EditProfile, EditProjectInfo } from "../components/CardForm";
import { Loader } from "../components/Loader";
import projectImg from "../assets/projectImg.png";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  margin-top: 60px;
  position: fixed;
`;

const ProfileBoard = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5%;
  min-width: 20px;
`;

const ProfileImg = styled.svg`
  margin: 5px 0;
  fill: ${(props) => props.theme.navy};
  width: 50%;
`;

const UserEmail = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  border-top: 2px solid ${(props) => props.theme.white.veryDark};
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.grey.darker};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  svg {
    margin-right: 10px;
    height: 100%;
    fill: ${(props) => props.theme.grey.darker};
  }
`;

const UserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserNameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 200px;
  position: relative;
  font-size: 30px;
  margin: 20px 0;
`;

const EditProfileBtn = styled.button`
  margin-bottom: 4px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white.veryDark};
  margin-top: 20px;
`;

const UserInfoBox = styled.div``;

const Username = styled.span``;

const UserAge = styled.li``;

const UserBelong = styled.li``;

const UserPart = styled.li``;

const Quotes = styled.li``;

const ProjectBoard = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-left: 50px;
  overflow-y: scroll;
`;

const ProjectMenu = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
`;

const ProjectMenuLabel = styled.div`
  padding-left: 10px;
  height: 32px;
  font-size: 25px;
  color: ${(props) => props.theme.grey.darker};
  font-weight: 600;
`;

const AddProject = styled.button`
  margin-left: 5px;
  margin-bottom: 2px;
  padding-bottom: 2px;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;

  svg {
    fill: ${(props) => props.theme.grey.lighter};
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProjectList = styled.div`
  padding: 20px 10px;

  width: 100%;
  height: calc(100% - 34px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  gap: 50px;
`;

const Project = styled.div`
  width: 45%;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 1080px) {
    width: 90%;
  }
`;

const ProjectTitle = styled(Link)`
  display: flex;
  width: auto;
  margin-left: 5%;
  height: 30px;
  font-size: 19px;
  font-weight: 500;
  padding-left: 5px;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.navy};
  }
  color: ${(props) => props.theme.grey.darker};
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  width: 90%;
  height: 300px;
  background-color: ${(props) => props.theme.white.veryDark};
  box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.2) inset;
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: calc(100vh - 40px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  background-color: "rgba(0, 0, 0, 0.5)";
`;

const NewCard = styled(motion.div)`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  width: 40%;
  height: 80%;
  border: none;
  position: absolute;
  top: 10%;
`;
const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.navy};
  margin-right: 5px;
`;

const Duration = styled.span`
  color: ${(props) => props.theme.grey.darker};
  width: auto;
  margin-left: 5%;
  height: 20px;
  font-size: 10px;

  padding-left: 35px;
`;

const ProjectImg = styled.img`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ProjectSlogan = styled.span`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.grey.darker};
  font-weight: 600;
`;

const ProjectTeammates = styled.div`
  height: 40px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  flex-wrap: wrap;
  color: ${(props) => props.theme.grey.darker};
`;

const ProjectTeammate = styled.span`
  width: auto;
  height: fit-content;
  border-radius: 5px;
  padding: 1px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const overlayVariant = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const newCardVariant = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
  exit: { scale: 0 },
};

export function Profile() {
  const email = useRecoilValue(emailState);
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const { userId } = useParams();
  const [edit, setEdit] = useState(false);
  const { data, isLoading } = useQuery<IData>(
    ["project", userId],
    () => getProfile(userId),
    {
      onSuccess(data) {
        console.dir(data);
      },
    }
  );
  const userInfo = data?.user.information
    .split(",")
    .map((value) => value.trim());

  return (
    <>
      {isLoading ? (
        <Loader type="bars" color="#00355B" message="불러오는 중..." />
      ) : (
        <Container>
          <ProfileBoard>
            <ProfileImg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z" />
            </ProfileImg>
            <UserInfoForm>
              <UserNameBox>
                <Username>{data?.user.name}</Username>
              </UserNameBox>
              <UserEmail>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                </svg>
                {email}
              </UserEmail>
              <UserInfoBox>
                <UserAge>{userInfo && userInfo[0]}</UserAge>
                <UserBelong>{userInfo && userInfo[1]}</UserBelong>
                <UserPart>{userInfo && userInfo[2]}</UserPart>
                <Quotes>{userInfo && userInfo[3]}</Quotes>
              </UserInfoBox>
              <EditProfileBtn
                type="button"
                onClick={() => setNewCard("editProfile")}
              >
                프로필 편집
              </EditProfileBtn>
            </UserInfoForm>
          </ProfileBoard>
          <ProjectBoard>
            <ProjectMenu>
              <ProjectMenuLabel>{data?.user.name}의 프로젝트</ProjectMenuLabel>

              <AddProject onClick={() => setNewCard("addProject")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </AddProject>
            </ProjectMenu>
            <ProjectList>
              {data?.project_list.map((project) => (
                <Project key={project.project_id}>
                  <ProjectTitle to={`/main/${project.project_id}`}>
                    <ColorBox />
                    {project.title}
                  </ProjectTitle>
                  <Duration>{project.duration}</Duration>
                  <ProjectInfo>
                    <ProjectImg src={projectImg} />
                    <ProjectSlogan>{`"${project.introduction}"`}</ProjectSlogan>
                    <ProjectTeammates>
                      {`팀원: `}
                      {project.teammates.map((teammate) => (
                        <ProjectTeammate>{teammate}</ProjectTeammate>
                      ))}
                    </ProjectTeammates>
                  </ProjectInfo>
                </Project>
              ))}
            </ProjectList>
          </ProjectBoard>
          {newCard === "addProject" ? (
            <Overlay
              variants={overlayVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setNewCard(null)}
            >
              <NewCard
                variants={newCardVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <EditProjectInfo />
              </NewCard>
            </Overlay>
          ) : null}
          {newCard === "editProfile" ? (
            <Overlay
              variants={overlayVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setNewCard(null)}
            >
              <NewCard
                variants={newCardVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <EditProfile />
              </NewCard>
            </Overlay>
          ) : null}
        </Container>
      )}
    </>
  );
}
