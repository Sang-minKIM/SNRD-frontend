import React from "react";
import styled from "styled-components";

import { NewCardForm } from "./NewCardForm";

export default {
  title: "components/NewCardForm",
  component: NewCardForm,
};

const Overlay = styled.div`
  width: 100vw;
  height: calc(100vh - 110px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  background-color: "rgba(0, 0, 0, 0.5)";
`;

const NewCard = styled.div`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  width: 30%;
  height: 30%;
  min-height: 200px;
  border: none;
  position: absolute;
  top: 30%;
`;

export const StyledForm = () => (
  <Overlay>
    <NewCard>
      <NewCardForm></NewCardForm>
    </NewCard>
  </Overlay>
);
