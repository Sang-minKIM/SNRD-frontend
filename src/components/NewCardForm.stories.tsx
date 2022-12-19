import React from "react";
import styled from "styled-components";

import { EditProfile } from "./CardForm";

export default {
  title: "components/NewCardForm",
  component: EditProfile,
};

const Overlay = styled.div`
  width: 100vw;
  height: calc(100vh - 90px);
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
  width: 40%;
  height: 94%;

  border: none;
  position: absolute;
  top: 0;
`;

export const StyledForm = () => (
  <Overlay>
    <NewCard>
      <EditProfile></EditProfile>
    </NewCard>
  </Overlay>
);
