import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUserProp, postJoin } from "../api";
import bgimg from "../assets/loginBg.svg";
import {
  BgImg,
  Container,
  IdInput,
  JoinBtn,
  JoinNav,
  JoinSpan,
  LoginBtn,
  LoginForm,
  Logo,
  Name,
} from "./Login";

const JoinForm = styled(LoginForm)`
  margin-top: 3vh;
  height: 70%;
`;

const UserNameInput = styled(IdInput)``;
const PasswordInput = styled(IdInput)``;
const ConfirmPasswordInput = styled(IdInput)``;
const SubmitBtn = styled(LoginBtn)`
  height: 50px;
`;

interface IForm {
  username: string;
  userId: string;
  password: string;
  password1: string;
}

export function Join() {
  const { register, handleSubmit, setError } = useForm<IForm>();
  const mutation = useMutation(postJoin, {
    onMutate: (variable) => {
      console.log("onMutate", variable);

      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const navigate = useNavigate();

  const onValid = ({ username, userId, password, password1 }: IForm) => {
    if (password !== password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    mutation.mutate({ name: username, email: userId, password });
  };
  return (
    <Container>
      <JoinForm onSubmit={handleSubmit(onValid)}>
        <Logo />
        <Name>수나롭다</Name>
        <UserNameInput
          {...register("username", {
            required: "이름을 입력해주세요.",
            maxLength: { value: 15, message: "이름이 너무 긴데요?" },
          })}
          placeholder="이름"
        />
        <IdInput
          {...register("userId", {
            required: "ID를 입력해주세요.",
            minLength: {
              value: 3,
              message: "아이디가 너무 짧습니다.",
            },
            maxLength: 15,
          })}
          placeholder="아이디"
        />
        <PasswordInput
          {...register("password", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
          type="password"
          placeholder="비밀번호"
        />
        <ConfirmPasswordInput
          {...register("password1", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <SubmitBtn type="submit" value="회원가입" />
        <JoinNav>
          <JoinSpan>이미 계정이 있으신가요?</JoinSpan>
          <JoinBtn to="/login">로그인</JoinBtn>
        </JoinNav>
      </JoinForm>
      <BgImg src={bgimg} />
    </Container>
  );
}
