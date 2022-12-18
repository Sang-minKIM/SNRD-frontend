import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { putCategories, putProjectInfo, putTasks } from "../api";
import { categoryState, dateState, newCardState, toDoState } from "../atom";
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

export function NewCategoryForm() {
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [category, setCategory] = useRecoilState(categoryState);
  const mutation = useMutation(() => putCategories(category), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ topic }: IForm) => {
    const newTopic = {
      id: Date.now(),
      categoryIndex: category[newCard!].length,
      part: newCard!,
      topic: topic,
      contents: "",
      commentCounts: 0,
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
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [category, setCategory] = useRecoilState(categoryState);
  const mutation = useMutation(() => putCategories(category), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = () => {};
  useEffect(() => mutation.mutate(), [category]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>제목</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="새로운 작업의 제목을 입력하세요"
      />
      <Submit type="submit" value="Done" />
    </Form>
  );
}

export function NewCardForm() {
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [todos, setTodos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const mutation = useMutation(() => putTasks(todos), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ topic, part }: IForm) => {
    // const newTopic = {
    //   id: Date.now(),
    //   categoryIndex: category[part].length,
    //   category: part!,
    //   topic: topic,
    //   commentCounts: 0,
    // };
    // setTodos((allTodos) => {
    //   return {
    //     ...allTodos,
    //     [newCard!]: [...allTodos[newCard!], newTopic],
    //   };
    // });
    setNewCard(null);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>제목</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="새로운 작업의 제목을 입력하세요"
      />
      <Label>파트</Label>
      <Select {...register("part")}>
        <Option value="plan">기획</Option>
        <Option value="design">디자인</Option>
        <Option value="frontend">프론트엔드</Option>
        <Option value="backend">백엔드</Option>
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

  const posting = {
    id,
    title: "",
    teammates: [],
    duration: `${startDate} ~ ${endDate}`,
    introduction: "",
  };

  const mutation = useMutation(putProjectInfo, {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    // mutation.mutate({ id, posting });
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
        placeholder="팀원의 email을 입력하세요. (진형@likelion.org, 영훈@likelion.org, ...)"
      />

      <Submit type="submit" value="확인" />
    </Form>
  );
}
