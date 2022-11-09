import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, infoState, newBoardState } from "../atom";

import Categories from "../components/Categories";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NewBoardForm from "../components/NewBoardForm";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 110px);
  margin-top: 110px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
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

const Content = styled.div`
  width: 90%;
  margin: 5% auto;
  height: fit-content;
`;

const Topic = styled.h3`
  font-weight: 500;
  font-size: 20px;
`;

const Text = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 15px;
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
  width: 100vw;
  height: calc(100vh-100px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewBoard = styled(motion.div)`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  width: 30%;
  height: 30%;
  min-height: 200px;
  border: none;
  position: absolute;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function Home() {
  const [newBoard, setNewBoard] = useRecoilState(newBoardState);
  const [info, setInfo] = useRecoilState(infoState);
  //   const textRef = useRef<any>([
  //     React.createRef(),
  //     React.createRef(),
  //     React.createRef(),
  //   ]);

  //   const handleResizeHeight = useCallback(() => {
  //     console.log(textRef.current);
  //     textRef.current[0].current.style.height =
  //       textRef.current[0].current.scrollHeight + "px";
  //   }, []);

  return (
    <>
      <Header />
      <Navigation />
      <Wrapper>
        <Categories />
        <Contents>
          <ProjectName placeholder={info.name} />
          <Member size={info.member.length + 10} placeholder={info.member} />
          {/* {categories.map((category, index) => (
            <Content key={category.topic}>
              <Topic>{category.topic}</Topic>
              <hr />
              <Text
                key={category.topic}
                // onInput={handleResizeHeight}
                // ref={textRef.current[index]}
              >
                {category.contents}
              </Text>
            </Content>
          ))} */}
        </Contents>

        <AnimatePresence>
          {newBoard ? (
            <>
              <Overlay
                variants={overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setNewBoard(null)}
              ></Overlay>
              <NewBoard layoutId={newBoard}>
                <NewBoardForm />
              </NewBoard>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}
export default Home;
