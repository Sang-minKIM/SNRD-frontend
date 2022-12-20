import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getCategories } from "../api";
import { categoryState, ICategoryState, newCardState } from "../atom";

import Categories from "../components/Categories";

import Navigation from "../components/Navigation";
import { EditProjectInfo, NewCategoryForm } from "../components/CardForm";

import { OnePager } from "../components/OnePager";
import { Loader } from "../components/Loader";

const Wrapper = styled.div`
  min-width: 900px;
  position: fixed;
  width: 100vw;
  height: calc(100vh - 90px);
  top: 110px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  overflow-x: scroll;
`;

export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  z-index: 20;
`;

export const NewCard = styled(motion.div)`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  width: 30%;
  height: 30%;
  min-height: 200px;
  border: none;
  position: absolute;
  top: 30%;
  z-index: 21;
`;

const NewProjectCard = styled(motion.div)`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  width: 50%;
  height: auto;
  min-height: 200px;
  border: none;
  position: absolute;
  top: 10%;
  z-index: 21;
`;

export const overlayVariant = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

export const newCardVariant = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
  exit: { scale: 0 },
};

export function Project() {
  const [categories, setCategories] = useRecoilState(categoryState);
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const { projectId } = useParams();
  const { isLoading, data } = useQuery<ICategoryState>(
    ["allCategories"],
    () => getCategories(projectId),
    {
      onSuccess: (data) => {
        setCategories(data);
        console.log("data", data);
        console.log("category", categories);
      },
    }
  );

  // useEffect(() => {
  //   data &&
  //     setCategories(() => {
  //       const plan = data.filter(
  //         (item: { part: string }) => item.part === "plan"
  //       );
  //       const design = data.filter(
  //         (item: { part: string }) => item.part === "design"
  //       );
  //       const frontend = data.filter(
  //         (item: { part: string }) => item.part === "frontend"
  //       );
  //       const backend = data.filter(
  //         (item: { part: string }) => item.part === "backend"
  //       );
  //       return { plan, design, frontend, backend };
  //     });
  // }, [data, setCategories]);

  return (
    <>
      <Navigation />
      {isLoading ? (
        <Loader type="bars" color="#00355B" message="불러오는 중..." />
      ) : (
        <Wrapper>
          <Categories />
          <OnePager />
          <AnimatePresence>
            {newCard === "PM" ||
            newCard === "Design" ||
            newCard === "Frontend" ||
            newCard === "Backend" ? (
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
                  <NewCategoryForm />
                </NewCard>
              </>
            ) : null}
            {newCard === "project" ? (
              <>
                <Overlay
                  variants={overlayVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setNewCard(null)}
                ></Overlay>
                <NewProjectCard
                  variants={newCardVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <EditProjectInfo />
                </NewProjectCard>
              </>
            ) : null}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}
