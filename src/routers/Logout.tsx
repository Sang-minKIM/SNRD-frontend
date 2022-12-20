import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { postLogout } from "../api";
import { emailState, loginState, userIdState } from "../atom";

export function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [email, setEmail] = useRecoilState(emailState);
  const navigate = useNavigate();
  const mutation = useMutation(postLogout, {
    onMutate: (variable) => {
      console.log("onMutate", variable);

      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
      navigate("/login");
      setEmail(null);
      setIsLoggedIn(null);
      setUserId(null);
    },
  });
  useEffect(() => {
    mutation.mutate(email);
  }, []);
  return <></>;
}
