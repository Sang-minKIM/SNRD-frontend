import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postLogin } from "../api";
import bgimg from "../assets/loginBg.svg";

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  top: 60px;
  position: fixed;
  display: flex;
  justify-content: center;
`;

export const LoginForm = styled.form`
  z-index: 10;
  width: 25%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10vh;
  min-width: 262px;
  min-height: 380px;
`;

export const Logo = styled.div`
  width: 22%;
  padding-bottom: 22%;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

export const Name = styled.span`
  font-size: 30px;
  font-weight: 600;
  margin: 15px 0;
`;

export const IdInput = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.grey.lighter};
  height: 48px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.grey.veryLight};
  margin-bottom: 10px;
  font-size: 17px;
  padding-left: 5px;
`;

const PasswordInput = styled(IdInput)``;

export const LoginBtn = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.navy};
  height: 12.5%;
  color: ${(props) => props.theme.white.light};
  border-radius: 15px;
  border: none;
  margin-top: 20px;
  font-size: 17px;
`;

export const JoinNav = styled.nav`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f5f5f5;
  margin-top: 15px;
`;

export const JoinSpan = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.grey.lighter};
  margin-right: 5px;
  height: 100%;
  padding-bottom: 1px;
`;

export const JoinBtn = styled(Link)`
  height: 100%;
  font-size: 15px;
  border-bottom: 1px solid ${(props) => props.theme.grey.lighter};
  right: 10px;
  color: ${(props) => props.theme.grey.lighter};
`;

export const BgImg = styled.img`
  position: fixed;
  bottom: 0;
  width: 85%;
  min-width: 892px;
`;

interface IForm {
  email: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();
  const mutation = useMutation(postLogin, {
    onMutate: (variable) => {
      console.log("onMutate", variable);

      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
      navigate(`/profile/33`);
    },
  });

  const onValid = ({ email, password }: IForm) => {
    mutation.mutate({ email, password });
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onValid)}>
        <Logo />
        <Name>수나롭다</Name>
        <IdInput
          {...register("email", {
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
          placeholder="비밀번호"
        />
        <LoginBtn type="submit" value="로그인" />
        <JoinNav>
          <JoinSpan>아직 계정이 없으신가요?</JoinSpan>
          <JoinBtn to="/join">회원가입</JoinBtn>
        </JoinNav>
      </LoginForm>
      <BgImg src={bgimg} />
    </Container>
  );
}
