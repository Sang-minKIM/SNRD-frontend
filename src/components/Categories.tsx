import { useMutation } from "@tanstack/react-query";
import edit from "../assets/edit.svg";
import { useEffect, useRef } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { putCategories } from "../api";
import { categoryState, newCardState } from "../atom";
import Category from "./Category";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  height: 97%;
  width: 23%;
  background-color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  padding-top: 0;
  border: 1px solid #e0e0e0;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: ${(props) => props.theme.white.veryDark};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.navy};
  }
`;

const Board = styled.div`
  display: grid;
`;

const BoardTitle = styled.div`
  border-bottom: solid 3px ${(props) => props.theme.navy};
  font-size: 18px;
  font-weight: 500;
  width: 110%;
  position: sticky;
  top: -1px;
  margin: 10px auto;
  padding-top: 15px;
  padding-bottom: 5px;
  background-color: #fff;
  text-align: left;
  z-index: 10;
`;

const AddCategory = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 8%;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  svg {
    fill: ${(props) => props.theme.navy};
  }
`;

const Info = styled.div`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  font-size: larger;
  font-weight: 500;
  color: black;
  border: 1px solid #e0e0e0;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
const EditIcon = styled(motion.img)`
  width: 23px;
`;

const Column = styled.div`
  display: flex;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.navy};
`;

const Text = styled.span`
  padding-left: 15px;
  text-align: left;
`;

function Categories() {
  const [categories, setCategories] = useRecoilState(categoryState);
  const { projectId } = useParams();
  const setNewCard = useSetRecoilState(newCardState);
  const mutation = useMutation(
    () => putCategories({ projectId, newCategories: categories }),
    {
      onSuccess: (data, variables, context) => {
        console.log("success", data, variables, context);
      },
    }
  );
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;
    if (destination.droppableId !== source.droppableId) return;

    setCategories((all) => {
      const sources = [...all[source.droppableId]];
      const card = sources[source.index];
      sources.splice(source.index, 1);
      sources.splice(destination.index, 0, card);
      return { ...all, [destination.droppableId]: sources };
    });
  };

  useEffect(() => mutation.mutate(), [categories]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div>
          <BoardTitle>Info</BoardTitle>
          <Info>
            <Column>
              <ColorBox />
              <Text>프로젝트 정보</Text>
            </Column>
            <EditIcon
              onClick={() => setNewCard("project")}
              src={edit}
              alt="null"
            />
          </Info>
        </div>
        {Object.keys(categories).map((part, index) => (
          <Droppable key={part} droppableId={part}>
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                <BoardTitle>
                  {part}
                  <AddCategory onClick={() => setNewCard(part)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </AddCategory>
                </BoardTitle>
                {categories[part].map((category, index) => (
                  <Category
                    category={category}
                    index={index}
                    key={category.topic}
                  />
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        ))}
      </Wrapper>
    </DragDropContext>
  );
}
export default Categories;
