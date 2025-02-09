import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postLogin } from "../api";
import bgimg from "../assets/loginBg.svg";
import squareLogo from "../assets/squareLogo.svg";
import { emailState, loginState, userIdState } from "../atom";
import { Loader } from "../components/Loader";

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

export const Logo = styled.img`
  width: 40%;
  margin-bottom: 20px;
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
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [email, setEmail] = useRecoilState(emailState);
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();
  const mutation = useMutation(postLogin, {
    onMutate: (variable) => {
      console.log("onMutate", variable);

      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
      navigate(`/profile/${data.id}`);
      setIsLoggedIn(data.token);
      setUserId(data.id);
    },
  });

  const onValid = ({ email, password }: IForm) => {
    mutation.mutate({ email, password });
    setEmail(email);
  };

  return (
    <Container>
      {mutation.isLoading ? (
        <Loader type="bars" color="#00355B" message="로그인 중..." />
      ) : (
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <Logo src={squareLogo} />

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
      )}

      <BgImg src={bgimg} />
    </Container>
  );
}
