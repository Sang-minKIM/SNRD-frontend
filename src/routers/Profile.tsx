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
  justify-content: center;
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
  height: 350px;
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
`;

const DoingProject = styled.div``;

const DoingSpan = styled.span;

const AddProject = styled.button``;

const ProjectList = styled.div``;

const Project = styled.div``;

const ProjectTitle = styled(Link)``;

const ProjectInfo = styled.div``;

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

function Profile() {
  const { userId } = useParams();
  const [edit, setEdit] = useState(false);

  const result = useQueries({
    queries: [
      {
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
      },
      { queryKey: ["project", userId], queryFn: getProject },
    ],
  });

  let isLoading = result.some((data) => data.isLoading);

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
                  <UsernameInput value={result[0].data?.username} />
                  <EditProfileBtn
                    type="button"
                    onClick={() => setEdit((curr) => !curr)}
                  >
                    <EditBtnImg src={editImg} />
                  </EditProfileBtn>
                </UserNameBox>

                <UserAgeInput value={result[0].data?.userAge} />
                <UserBelongInput value={result[0].data?.userBelong} />
                <UserPartInput value={result[0].data?.userPart} />
                <QuotesInput value={result[0].data?.quotes} />
              </UserInfoForm>
            ) : (
              <UserInfoForm>
                <UserNameBox>
                  <Username>{result[0].data?.username}</Username>
                  <EditProfileBtn
                    type="button"
                    onClick={() => setEdit((curr) => !curr)}
                  >
                    <EditBtnImg src={editImg} />
                  </EditProfileBtn>
                </UserNameBox>
                <UserInfoBox>
                  <UserAge>{`${result[0].data?.userAge}세`}</UserAge>
                  <UserBelong>{result[0].data?.userBelong}</UserBelong>
                  <UserPart>{result[0].data?.userPart}</UserPart>
                  <Quotes>{result[0].data?.quotes}</Quotes>
                </UserInfoBox>
              </UserInfoForm>
            )}
          </ProfileBoard>
          <ProjectBoard></ProjectBoard>
        </Container>
      )}
    </>
  );
}
export default Profile;
