import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atom";

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
  text-align: left;
  position: relative;
  svg {
    width: 20px;
    fill: ${(props) => props.theme.grey.lighter};
  }
  span {
    position: absolute;
    right: 39px;
    bottom: 14px;
    font-size: 14px;
    color: todoColor;
  }
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

interface IColorBoxProps {
  bgColor: string;
}

interface ICard {
  todo: IToDo;
  index: number;
}

function Card({ todo, index }: ICard) {
  const [todoColor, setTodoColor] = useState("");
  useEffect(() => {
    switch (todo.part) {
      case "plan":
        setTodoColor("#56d1b5");
        break;
      case "design":
        setTodoColor("#f8c958");
        break;
      case "frontend":
        setTodoColor("#3498db");
        break;
      case "backend":
        setTodoColor("#746af1");
        break;
      default:
        setTodoColor("");
    }
  }, [todo]);
  return (
    <Draggable index={index} key={todo.id} draggableId={todo.id + ""}>
      {(provided) => (
        <Area
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Column>
            <ColorBox bgColor={todoColor} />
            <Text>{todo.topic}</Text>
          </Column>

          {todo.commentCounts === 0 ? null : (
            <>
              <span>{todo.commentCounts}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
              </svg>
            </>
          )}
        </Area>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
