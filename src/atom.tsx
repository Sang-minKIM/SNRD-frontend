import { atom } from "recoil";

interface ICategory {
  topic: string;
  contents: string;
}

interface ICategoryState {
  [key: string]: ICategory[];
}

export const infoState = atom({
  key: "information",
  default: {
    name: "수나롭다",
    member: "김상민, 안영훈, 이예린, 이진형",
  },
});

export const categoryState = atom<ICategoryState>({
  key: "category",
  default: {
    기획: [
      { topic: "문제인식", contents: "plan" },
      { topic: "타겟설정", contents: "plan" },
      { topic: "시장조사/자료조사", contents: "plan" },
      { topic: "핵심 아이디어", contents: "plan" },
      { topic: "세부 아이디어", contents: "plan" },
    ],
    디자인: [
      { topic: "Mood board", contents: "design" },
      { topic: "Key color/visual", contents: "design" },
      { topic: "UI sketch", contents: "design" },
      { topic: "Wireframe", contents: "design" },
    ],
    프론트엔드: [
      { topic: "Setting", contents: "frontend" },
      { topic: "Home", contents: "frontend" },
      { topic: "Login", contents: "frontend" },
      { topic: "Join", contents: "frontend" },
      { topic: "Profile", contents: "frontend" },
      { topic: "Board", contents: "frontend" },
    ],
    백엔드: [
      { topic: "초기설정", contents: "backend" },
      { topic: "Router setting", contents: "backend" },
      { topic: "DB구상", contents: "backend" },
      { topic: "DB구현", contents: "backend" },
      { topic: "상세기능 구현", contents: "backend" },
      { topic: "배포환경설정", contents: "backend" },
    ],
  },
});

// interface ITodo {
//   id: number;
//   text: string;
// }

export interface IToDo {
  id: number;
  topic: string;
  category: string;
  image?: string;
  contents: string;
  comments: string[];
}
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "boards",
  default: {
    "해야 할 일": [
      {
        id: 0,
        category: "plan",
        topic: "배경/문제인식",
        contents:
          "'왜' 이번 작업을 하려 하나요? 동기는 무엇인지, 이전에 비슷한 시도가 있었는지, 있었다면 그때는 어떤 사유로 해결하지 못했는지 등 맥락 파악을 위한 작업 배경을 작성해 주세요.",
        comments: ["hello", "lololol"],
      },
      {
        id: 1,
        category: "plan",
        topic: "타겟설정",
        contents:
          "해결하고 싶은 문제의 고객은 누구인가요? 유저 스토리 형태로 먼저 작성해 주세요 (ex. 고객은 ~ )",
        comments: [],
      },
      {
        id: 2,
        category: "plan",
        topic: "시장조사/자료조사",
        contents:
          "피드백 받고 싶은 질문을 작성해 주세요. Stakeholder들이 읽고서 자주 질문할만한 내용을 미리 뽑아서 직접 답변을 적어도 좋습니다.",
        comments: ["hello"],
      },
      {
        id: 3,
        category: "plan",
        topic: "솔루션",
        contents:
          "고객의 문제를 어떻게 해결하고자 하나요? 이해를 돕기 위한 간단한 스케치는 첨부해도 좋습니다. 그 이상의 와이어프레임이나 디자인 결과물을 첨부하지 마세요.",
        comments: [],
      },
      {
        id: 4,
        category: "plan",
        topic: "목표가 아닌 것",
        contents:
          "목표가 아닌 것은 프로젝트에 연관되어 있으나 의도적으로 하지 않거나 해결하지 않으려는 것입니다. 목표가 아닌 것을 잘 정의해야 '이것도 같이 하면 좋겠다'는 독자들의 의견을 막을 수 있습니다. ",
        comments: [],
      },
      {
        id: 5,
        category: "plan",
        topic: "벤치마크",
        contents:
          "다른 서비스 제공자는 이 문제를 어떻게 풀고 있나요? 우리가 참고해야할 것은 무엇이고, 우리와 다른 것은 어떤 것인가요?",
        comments: [],
      },
    ],
    진행중: [
      {
        id: 7,
        category: "frontend",
        topic: "프로젝트 메인화면",
        contents: "왼쪽 카테고리 구현중",
        comments: ["doing~"],
      },
    ],
    검토중: [
      {
        id: 6,
        category: "design",
        topic: "Key color/visual",
        contents: "navy",
        comments: ["good!"],
      },
    ],
    "완료!": [
      {
        id: 8,
        category: "backend",
        topic: "DB구상",
        contents: "끝!",
        comments: ["done!"],
      },
    ],
  },
});

export const newBoardState = atom<string | null>({
  key: "new",
  default: null,
});
