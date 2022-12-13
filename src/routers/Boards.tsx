import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getTasks, putTasks } from "../api";
import { newCardState, toDoState } from "../atom";
import Card from "../components/Card";
import Navigation from "../components/Navigation";
import { NewCardForm } from "../components/NewCardForm";
import { TrashCan } from "../components/TrashCan";
import { NewCard, newCardVariant, Overlay, overlayVariant } from "./Home";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: calc(100vh - 90px);
  margin-top: 110px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${(props) => props.theme.white.darker};
  min-width: 1200px;
`;

const BoardList = styled.div`
  border-radius: 5px;
  display: flex;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: flex-end;
  height: 97%;
  width: 97%;
`;
const Board = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 22%;
  height: 95%;
  position: relative;
`;

const Column = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Border = styled.div`
  width: 40%;
  height: 3px;
  background-color: ${(props) => props.theme.navy};
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.span`
  padding-left: 1px;
  text-align: left;
  font-weight: 700;
  color: ${(props) => props.theme.black.lighter};
  font-size: 23px;
`;
const Buttons = styled.div``;

const AddBoard = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  svg {
    fill: ${(props) => props.theme.grey.lighter};
  }
  &:hover {
    cursor: pointer;
  }
`;

const BoardMenu = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  svg {
    fill: ${(props) => props.theme.grey.lighter};
  }
`;

const Area = styled.div<ISnapshotProps>`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  flex-grow: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.white.veryDark
      : props.draggingFromThisWith
      ? props.theme.white.veryDark
      : "transparent"};
  transition: 0.3s ease-in;
`;

interface ISnapshotProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

function Boards() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const { isLoading } = useQuery(["tasks"], getTasks, {
    onSuccess: (data) => {
      setToDos(() => data);
    },
  });
  const mutation = useMutation(() => putTasks(toDos), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });

  useEffect(() => mutation.mutate(), [toDos]);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; //toDoState object에서 source.droppableId인 키를 가진 배열
        const taskCard = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination?.index, 0, taskCard);
        return { ...allBoards, [destination.droppableId]: sourceBoard };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      if (destination.droppableId === "trash") {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return { ...allBoards, [source.droppableId]: sourceBoard };
        });
      }
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskCard = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskCard);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <Navigation />
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <BoardList>
              {Object.keys(toDos).map((boardId) => (
                <Board key={boardId}>
                  <Column>
                    <Border />
                    <Title>{boardId}</Title>
                    <Buttons>
                      <AddBoard onClick={() => setNewCard(boardId)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                      </AddBoard>
                      <BoardMenu>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
                        </svg>
                      </BoardMenu>
                    </Buttons>
                  </Column>
                  <Droppable droppableId={boardId}>
                    {(provided, snapshot) => (
                      <Area
                        draggingFromThisWith={Boolean(
                          snapshot.draggingFromThisWith
                        )}
                        isDraggingOver={snapshot.isDraggingOver}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {toDos[boardId].map((todo, index) => (
                          <Card todo={todo} key={todo.id} index={index} />
                        ))}
                        {provided.placeholder}
                      </Area>
                    )}
                  </Droppable>
                </Board>
              ))}
            </BoardList>
            <TrashCan />
            <AnimatePresence>
              {newCard ? (
                <>
                  <Overlay
                    variants={overlayVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => setNewCard(null)}
                  ></Overlay>
                  <NewCard
                    variants={newCardVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <NewCardForm />
                  </NewCard>
                </>
              ) : null}
            </AnimatePresence>
          </Wrapper>
        </DragDropContext>
      )}
    </>
  );
}
export default Boards;
