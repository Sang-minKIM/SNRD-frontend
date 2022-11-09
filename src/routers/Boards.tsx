import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";
import Card from "../components/Card";

import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 110px);
  margin-top: 110px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${(props) => props.theme.white.darker};
`;

const BoardList = styled.div`
  border-radius: 5px;
  display: flex;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: flex-end;
  height: 95%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
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

const Title = styled.h2`
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
      <Header />
      <Navigation />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardList>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId}>
                <Column>
                  <Border />
                  <Title>{boardId}</Title>
                  <Buttons>
                    <AddBoard>
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
        </Wrapper>
      </DragDropContext>
    </>
  );
}
export default Boards;
