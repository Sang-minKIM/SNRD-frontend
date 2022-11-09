import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Area = styled.div`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  font-size: larger;
  font-weight: 500;
  color: black;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Column = styled.div`
  display: flex;
`;

const ColorBox = styled.div<IColorBoxProps>`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: ${(props) => props.bgColor};
`;

const Text = styled.h2`
  padding-left: 15px;
  text-align: left;
`;

const DragIcon = styled.svg`
  width: 5%;
`;

interface IColorBoxProps {
  bgColor: string;
}

interface ICategory {
  category: { topic: string; contents: string };
  index: number;
}

function Category({ category, index }: ICategory) {
  const [categoryColor, setCategoryColor] = useState("");
  useEffect(() => {
    switch (category.contents) {
      case "plan":
        setCategoryColor("#56d1b5");
        break;
      case "design":
        setCategoryColor("#f8c958");
        break;
      case "frontend":
        setCategoryColor("#3498db");
        break;
      case "backend":
        setCategoryColor("#746af1");
        break;
      default:
        setCategoryColor("");
    }
  }, [category]);
  return (
    <Draggable index={index} key={category.topic} draggableId={category.topic}>
      {(provided) => (
        <Area
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Column>
            <ColorBox bgColor={categoryColor} />
            <Text>{category.topic}</Text>
          </Column>
          <DragIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              fill="#e0e0e0"
              d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"
            />
          </DragIcon>
        </Area>
      )}
    </Draggable>
  );
}

export default React.memo(Category);
