import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { FcEmptyTrash, FcFullTrash } from "react-icons/fc";

const Container = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  right: 15px;
  bottom: 25px;
`;

const MiniContainer = styled(Container)`
  width: 30px;
  height: 30px;
  right: 9%;
  bottom: 5px;
`;

const Content = styled.div<{
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}>`
  font-size: 90px;
  width: 90px;
  height: 90px;

  padding: 10px;
`;

const MiniContent = styled(Content)`
  font-size: 30px;
  width: 30px;
  height: 30px;
  padding: 2px;
`;

export function TrashCan() {
  return (
    <Container>
      <Droppable droppableId="trash">
        {(
          provided: DroppableProvided,
          {
            isDraggingOver,
            draggingOverWith,
            draggingFromThisWith,
            isUsingPlaceholder,
          }: DroppableStateSnapshot
        ) => (
          <Content
            isDraggingOver={isDraggingOver}
            draggingFromThisWith={Boolean(draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isDraggingOver === false ? <FcEmptyTrash /> : <FcFullTrash />}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Container>
  );
}
export function MiniTrashCan() {
  return (
    <MiniContainer>
      <Droppable droppableId="trash">
        {(
          provided: DroppableProvided,
          {
            isDraggingOver,
            draggingOverWith,
            draggingFromThisWith,
            isUsingPlaceholder,
          }: DroppableStateSnapshot
        ) => (
          <MiniContent
            isDraggingOver={isDraggingOver}
            draggingFromThisWith={Boolean(draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isDraggingOver === false ? <FcEmptyTrash /> : <FcFullTrash />}
            {provided.placeholder}
          </MiniContent>
        )}
      </Droppable>
    </MiniContainer>
  );
}
