import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  addProject,
  getProfile,
  postProfile,
  putCategories,
  putProjectInfo,
  putTasks,
} from "../api";
import {
  categoryState,
  dateState,
  emailState,
  newCardState,
  toDoState,
} from "../atom";
import { Calender } from "./Calender";

const Form = styled.form`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.white.veryDark};
  border-radius: 5px;
`;
const Horizontal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Column = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ProfileImg = styled.svg`
  margin: 5px 0;
  fill: ${(props) => props.theme.navy};
  width: 30%;
`;
const SelectImgBtn = styled.input`
  height: 25px;
`;

const PopUpLabel = styled.span`
  width: 100%;
  padding: 5px 0;
  margin: 10px;
  color: ${(props) => props.theme.navy};
  font-size: 25px;
  font-weight: 500;
  border-bottom: 1px solid ${(props) => props.theme.navy};
`;
const Title = styled.input`
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px;
  &:focus {
    outline: none;
    border: solid ${(props) => props.theme.navy};
  }
`;

const Label = styled.label`
  width: 100%;
  margin-top: 15px;
  padding-left: 5px;
  padding-bottom: 3px;
  color: ${(props) => props.theme.navy};
`;

const Submit = styled.input`
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 50%;
  font-weight: 500;
  font-size: 15px;
  background-color: ${(props) => props.theme.navy};
  color: ${(props) => props.theme.white.darker};
  margin: 15px 0;
`;

const Select = styled.select`
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.grey.darker};
  &:focus {
    outline: none;
    border: solid ${(props) => props.theme.navy};
  }
`;

const Option = styled.option`
  width: 100%;
`;

const DurationBox = styled.div`
  position: relative;

  width: 100%;
`;

const Duration = styled.input`
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  &:focus {
    outline: none;
  }
`;

interface IForm {
  topic: string;
  part: string;
}
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

export function NewCategoryForm() {
  const { projectId } = useParams();
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [category, setCategory] = useRecoilState(categoryState);
  const mutation = useMutation(
    () => putCategories({ projectId, newCategories: category }),
    {
      onSuccess: (data, variables, context) => {
        console.log("success", data, variables, context);
      },
    }
  );
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ topic }: IForm) => {
    const newTopic = {
      id: Date.now(),
      categoryIndex: category[newCard!].length,
      category: newCard!,
      topic,
      contents: "",
      comment_list: [],
    };
    setCategory((allCategoies) => {
      return {
        ...allCategoies,
        [newCard!]: [...allCategoies[newCard!], newTopic],
      };
    });
    setNewCard(null);
  };
  useEffect(() => mutation.mutate(), [category]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <PopUpLabel>작업 생성</PopUpLabel>
      <Label>제목</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="새로운 작업의 제목을 입력하세요"
      />
      <Submit type="submit" value="Done" />
    </Form>
  );
}

export function EditCategoryForm() {
  const { projectId } = useParams();
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [category, setCategory] = useRecoilState(categoryState);
  const mutation = useMutation(
    () => putCategories({ projectId, newCategories: category }),
    {
      onSuccess: (data, variables, context) => {
        console.log("success", data, variables, context);
      },
    }
  );
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = () => {};
  useEffect(() => mutation.mutate(), [category]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>제목</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="제목을 입력하세요"
      />
      <Submit type="submit" value="Done" />
    </Form>
  );
}

export function NewCardForm() {
  const { projectId } = useParams();
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [todos, setTodos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const mutation = useMutation(() => putTasks({ projectId, newTask: todos }), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ topic, part }: IForm) => {
    const newTopic = {
      id: Date.now(),
      state_index: 0,
      category: part!,
      topic,
      comment_list: [],
      state: newCard!,
    };
    setTodos((allTodos) => {
      return {
        ...allTodos,
        [newCard!]: [...allTodos[newCard!], newTopic],
      };
    });
    setNewCard(null);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <PopUpLabel>작업 생성</PopUpLabel>
      <Label>제목</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="새로운 작업의 제목을 입력하세요"
      />
      <Label>파트</Label>
      <Select {...register("part")}>
        <Option value="PM">기획</Option>
        <Option value="Design">디자인</Option>
        <Option value="Frontend">프론트엔드</Option>
        <Option value="Backend">백엔드</Option>
      </Select>
      <Submit type="submit" value="Done" />
    </Form>
  );
}

export function EditProjectInfo() {
  const { id } = useParams();
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [date, setDate] = useState(false);
  const duration = useRecoilValue(dateState);

  // const startDate = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  // }).format(duration[0].startDate);
  // const endDate = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  // }).format(duration[0].endDate);

  const startDate = duration[0].startDate?.toLocaleDateString("ko", {
    dateStyle: "full",
  });
  const endDate = duration[0].endDate?.toLocaleDateString("ko", {
    dateStyle: "full",
  });

  const mutation = useMutation(putProjectInfo, {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm();
  const onValid = ({
    topic,
    slogan,
    team,
  }: {
    topic?: string;
    slogan?: string;
    team?: string;
  }) => {
    const teammates = team && team.split(",").map((v) => v.trim());
    const posting = {
      title: topic,
      teammates: teammates,
      duration: `${startDate} ~ ${endDate}`,
      slogan,
    };
    mutation.mutate({ id, posting });
    setNewCard(null);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <PopUpLabel>프로젝트 정보</PopUpLabel>
      <Label>프로젝트명</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="프로젝트 이름을 입력하세요."
      />
      <Label>기간설정</Label>
      <DurationBox>
        <Duration
          value={`${startDate} ~ ${endDate}`}
          type="button"
          onClick={() => setDate(true)}
        />
        {date ? <Calender setCalender={setDate} /> : null}
      </DurationBox>
      <Label>슬로건</Label>
      <Title
        {...register("slogan")}
        placeholder="프로젝트 슬로건이나 간단한 소개를 적어주세요."
      />
      <Label>팀원</Label>
      <Title
        {...register("team")}
        placeholder="팀원의 이름을 입력하세요. (이진형, 안영훈, 이예린 ...)"
      />

      <Submit type="submit" value="확인" />
    </Form>
  );
}

export function AddNewProject() {
  const { userId } = useParams();
  const email = useRecoilValue(emailState);
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [date, setDate] = useState(false);
  const duration = useRecoilValue(dateState);

  // const startDate = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  // }).format(duration[0].startDate);
  // const endDate = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  // }).format(duration[0].endDate);

  const startDate = duration[0].startDate?.toLocaleDateString("ko", {
    dateStyle: "full",
  });
  const endDate = duration[0].endDate?.toLocaleDateString("ko", {
    dateStyle: "full",
  });

  const mutation = useMutation(addProject, {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm();
  const onValid = ({
    topic,
    slogan,
    team,
  }: {
    topic?: string;
    slogan?: string;
    team?: string;
  }) => {
    const teammates = team && team.split(",").map((v) => v.trim());
    const posting = {
      email,
      title: topic,
      teammates,
      duration: `${startDate} ~ ${endDate}`,
      slogan,
    };
    mutation.mutate({ userId, posting });
    setNewCard(null);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <PopUpLabel>프로젝트 정보</PopUpLabel>
      <Label>프로젝트명</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="프로젝트 이름을 입력하세요."
      />
      <Label>기간설정</Label>
      <DurationBox>
        <Duration
          value={`${startDate} ~ ${endDate}`}
          type="button"
          onClick={() => setDate(true)}
        />
        {date ? <Calender setCalender={setDate} /> : null}
      </DurationBox>
      <Label>슬로건</Label>
      <Title
        {...register("slogan")}
        placeholder="프로젝트 슬로건이나 간단한 소개를 적어주세요."
      />
      <Label>팀원</Label>
      <Title
        {...register("team")}
        placeholder="팀원의 이름을 입력하세요. (이진형, 안영훈, 이예린 ...)"
      />

      <Submit type="submit" value="확인" />
    </Form>
  );
}

export function EditProfile() {
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const { register, handleSubmit } = useForm();
  const { userId } = useParams();

  const { data, isLoading } = useQuery<IData>(
    ["project", userId],
    () => getProfile(userId),
    {
      onSuccess(data) {
        console.dir(data);
      },
    }
  );
  const mutation = useMutation(postProfile, {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const userInfo = data?.user.information
    .split(",")
    .map((value) => value.trim());

  const onValid = ({
    name,
    age,
    part,
    univ,
    quote,
  }: {
    name?: string;
    age?: string;
    part?: string;
    univ?: string;
    quote?: string;
  }) => {
    const information = [age, univ, part, quote].join();
    mutation.mutate({ userId, name, information });
    setNewCard(null);
  };
  useEffect(() => {
    console.log(newCard);
  }, [newCard]);
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <PopUpLabel>사용자 정보</PopUpLabel>
      <ProfileImg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z" />
      </ProfileImg>
      <SelectImgBtn type="file" />
      <Label>이름</Label>
      <Title
        {...register("name", { required: true })}
        placeholder={data?.user.name}
      />
      <Horizontal>
        <Column>
          <Label>나이</Label>
          <Title {...register("age")} placeholder={userInfo && userInfo[0]} />
        </Column>
        <Column>
          <Label>파트</Label>
          <Title {...register("part")} placeholder={userInfo && userInfo[2]} />
        </Column>
      </Horizontal>

      <Label>학교/직장</Label>
      <Title {...register("univ")} placeholder={userInfo && userInfo[1]} />
      <Label>나를 표현하는 한줄</Label>
      <Title {...register("quote")} placeholder={userInfo && userInfo[3]} />

      <Submit type="submit" value="확인" />
    </Form>
  );
}
