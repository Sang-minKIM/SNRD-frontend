import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { putCategories, putProjectInfo, putTasks } from "../api";
import { categoryState, newCardState, toDoState } from "../atom";

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
const Title = styled.input`
  margin-top: 15px;
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px;
  &:focus {
    outline: none;
    border: solid ${(props) => props.theme.navy};
  }
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
`;
const Button = styled.input`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  font-size: larger;
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
      <Title
        {...register("topic", { required: true })}
        placeholder="제목을 입력하세요"
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
    const newTopic = {
      id: Date.now(),
      categoryIndex: category[part].length,
      part: part!,
      topic: topic,
      contents: "",
      commentCounts: 0,
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
      <Title
        {...register("topic", { required: true })}
        placeholder="제목을 입력하세요"
      />
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
  const posting = {
    id,
    title: "",
    teammates: [],
    duration: [],
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
  };

  <Form onSubmit={handleSubmit(onValid)}>
    <Title
      {...register("topic", { required: true })}
      placeholder="제목을 입력하세요"
    />

    <Submit type="submit" value="Done" />
  </Form>;
}
