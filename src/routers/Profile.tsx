import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProject, getUser } from "../api";
import editImg from "../assets/edit.svg";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
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

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fff;
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
  position: absolute;
  right: 0;
  margin-bottom: 4px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
`;

const EditBtnImg = styled.img`
  width: 100%;
`;

const UsernameInput = styled.input``;

const UserAgeInput = styled.input``;

const UserBelongInput = styled.input``;

const UserPartInput = styled.input``;

const QuotesInput = styled.input``;

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
  align-items: center;
  flex-wrap: wrap;

  gap: 50px;
`;

const Project = styled.div`
  width: 45%;
  height: 360px;
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
  margin-left: 5%;
  width: 90%;
  height: 300px;
  background-color: ${(props) => props.theme.white.veryDark};
  box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.2) inset;
`;

interface IUserData {
  id: number;
  username: string;
  userId: string;
  password: string;
  userAge: string;
  userBelong: string;
  userPart: string;
  quotes: string;
}
interface IProjectData {
  id: number;
  title: string;
  teammates: string[];
  duration: string[];
  introduction: string;
}

export function Profile() {
  const { userId } = useParams();
  const [edit, setEdit] = useState(false);
  const { data: userData, isLoading: userLoading } = useQuery<IUserData>(
    ["user", userId],
    () => getUser(userId)
  );
  const { data: projectData, isLoading: projectLoading } = useQuery<
    IProjectData[]
  >(["project", userId], getProject);

  const isLoading = userLoading || projectLoading;

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <Container>
          <ProfileBoard>
            <ProfileImg />
            {edit ? (
              <UserInfoForm>
                <UserNameBox>
                  <UsernameInput value={userData?.username} />
                  <EditProfileBtn
                    type="button"
                    onClick={() => setEdit((curr) => !curr)}
                  >
                    <EditBtnImg src={editImg} />
                  </EditProfileBtn>
                </UserNameBox>

                <UserAgeInput value={userData?.userAge} />
                <UserBelongInput value={userData?.userBelong} />
                <UserPartInput value={userData?.userPart} />
                <QuotesInput value={userData?.quotes} />
              </UserInfoForm>
            ) : (
              <UserInfoForm>
                <UserNameBox>
                  <Username>{userData?.username}</Username>
                  <EditProfileBtn
                    type="button"
                    onClick={() => setEdit((curr) => !curr)}
                  >
                    <EditBtnImg src={editImg} />
                  </EditProfileBtn>
                </UserNameBox>
                <UserInfoBox>
                  <UserAge>{`${userData?.userAge}세`}</UserAge>
                  <UserBelong>{userData?.userBelong}</UserBelong>
                  <UserPart>{userData?.userPart}</UserPart>
                  <Quotes>{userData?.quotes}</Quotes>
                </UserInfoBox>
              </UserInfoForm>
            )}
          </ProfileBoard>
          <ProjectBoard>
            <ProjectMenu>
              <ProjectMenuLabel>
                {userData?.username}의 프로젝트
              </ProjectMenuLabel>
              <AddProject>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </AddProject>
            </ProjectMenu>
            <ProjectList>
              {projectData?.map((project) => (
                <Project key={project.id}>
                  <ProjectTitle to={`/project/${project.id}`}>
                    {project.title}
                  </ProjectTitle>
                  <ProjectInfo></ProjectInfo>
                </Project>
              ))}
            </ProjectList>
          </ProjectBoard>
        </Container>
      )}
    </>
  );
}
