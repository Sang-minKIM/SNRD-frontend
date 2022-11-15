import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getCategories } from "../api";
import { categoryState, ICategory, infoState, newCardState } from "../atom";

import Categories from "../components/Categories";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NewCardForm from "../components/NewCardForm";

const Wrapper = styled.div`
  min-width: 900px;
  position: fixed;
  width: 100vw;
  height: calc(100vh - 110px);
  top: 110px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  overflow-x: scroll;
`;

const Contents = styled.form`
  background-color: ${(props) => props.theme.white.lighter};
  height: 95%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  border: 1px solid #e0e0e0;
`;

const ProjectName = styled.input`
  border: none;
  display: block;
  margin: 30px auto;
  width: max-content;
  font-size: 25px;
  padding: 5px 0;
  font-weight: 600;
  text-align: center;
`;
const Member = styled.input`
  border: none;
  display: block;
  height: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin: 30px auto;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewCard = styled(motion.div)`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  width: 30%;
  height: 30%;
  min-height: 200px;
  border: none;
  position: absolute;
  top: 30%;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function Home() {
  const { isLoading, data } = useQuery<ICategory[]>(
    ["allCategories"],
    getCategories
  );

  const [categories, setCategories] = useRecoilState(categoryState);
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const info = useRecoilValue(infoState);
  useEffect(() => {
    data &&
      setCategories(() => {
        const plan = data.filter(
          (item: { part: string }) => item.part === "plan"
        );
        const design = data.filter(
          (item: { part: string }) => item.part === "design"
        );
        const frontend = data.filter(
          (item: { part: string }) => item.part === "frontend"
        );
        const backend = data.filter(
          (item: { part: string }) => item.part === "backend"
        );
        return { plan, design, frontend, backend };
      });
  }, [data, setCategories]);
  return (
    <>
      <Header />
      <Navigation />
      <Wrapper>
        <Categories />
        <Contents>
          <ProjectName placeholder={info.name} />
          <Member size={info.member.length + 10} placeholder={info.member} />
        </Contents>

        <AnimatePresence>
          {newCard ? (
            <>
              <Overlay
                variants={overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setNewCard(null)}
              ></Overlay>
              <NewCard layoutId={newCard}>
                <NewCardForm />
              </NewCard>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}
export default Home;
