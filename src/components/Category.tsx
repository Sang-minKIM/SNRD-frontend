import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { activeState, ICategory } from "../atom";
import styles from "../css/Active.module.css";

const Area = styled.div`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  padding-right: 0;
  font-size: larger;
  font-weight: 500;
  color: black;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;

  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
`;

const TopicArea = styled.div`
  display: flex;
  justify-content: space-between;
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

const Text = styled.span`
  padding-left: 15px;
  text-align: left;
`;

const EditMenuBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 100%;
`;

const DragIcon = styled.svg`
  fill: ${(props) => props.theme.navy};
  width: 15px;
  height: 23px;
  &:hover {
    cursor: pointer;
  }
`;

const EditMenu = styled(motion.div)`
  transform-origin: top;
  margin-top: 10px;
  border-top: 1px solid #cfd7dd;
  height: 120px;
  display: flex;
  flex-direction: column;
`;

const EditItem = styled.div`
  display: flex;
  padding-top: 15px;
`;

const EditIcon = styled.svg`
  height: 23px;
  width: 20px;
  fill: ${(props) => props.theme.navy};
  &:nth-child(3) {
    fill: #da070f;
  }
`;

const EditSpan = styled.span`
  padding-left: 15px;
`;

interface IColorBoxProps {
  bgColor: string;
}

interface ICategoryProps {
  category: ICategory;
  index: number;
}

const menuVariant = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      type: "linear",
      duration: 0.35,
    },
  },
  exit: { scaleY: 0 },
};

function Category({ category, index }: ICategoryProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryColor, setCategoryColor] = useState("");
  const navigate = useNavigate();
  const active = useRecoilValue(activeState);
  useEffect(() => {
    switch (category.part) {
      case "PM":
        setCategoryColor("#56d1b5");
        break;
      case "Design":
        setCategoryColor("#f8c958");
        break;
      case "Frontend":
        setCategoryColor("#3498db");
        break;
      case "Backend":
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
          {...(isMenuOpen ? null : { ...provided.draggableProps })}
          {...provided.dragHandleProps}
        >
          <TopicArea>
            <Column>
              <ColorBox bgColor={categoryColor} />
              <Text>{category.topic}</Text>
            </Column>
            <EditMenuBtn>
              <DragIcon
                onClick={() => setIsMenuOpen((curr) => !curr)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </DragIcon>
            </EditMenuBtn>
          </TopicArea>
          {isMenuOpen ? (
            <EditMenu
              variants={menuVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <EditItem>
                <EditIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </EditIcon>
                <EditSpan>제목 수정</EditSpan>
              </EditItem>
              <EditItem>
                <EditIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V285.7l-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                </EditIcon>
                <EditSpan onClick={() => navigate(`/write/${category.id}`)}>
                  내용 수정
                </EditSpan>
              </EditItem>
              <EditItem>
                <EditIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </EditIcon>
                <EditSpan>항목 삭제</EditSpan>
              </EditItem>
            </EditMenu>
          ) : null}
        </Area>
      )}
    </Draggable>
  );
}

export default React.memo(Category);
