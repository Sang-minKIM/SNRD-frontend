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
    plan: [
      { topic: "문제인식", contents: "plan" },
      { topic: "타겟설정", contents: "plan" },
      { topic: "시장조사/자료조사", contents: "plan" },
      { topic: "핵심 아이디어", contents: "plan" },
      { topic: "세부 아이디어", contents: "plan" },
    ],
    design: [
      { topic: "Mood board", contents: "design" },
      { topic: "Key color/visual", contents: "design" },
      { topic: "UI sketch", contents: "design" },
      { topic: "Wireframe", contents: "design" },
    ],
    frontend: [
      { topic: "Router setting", contents: "frontend" },
      { topic: "Home", contents: "frontend" },
      { topic: "Login", contents: "frontend" },
      { topic: "Join", contents: "frontend" },
      { topic: "Profile", contents: "frontend" },
      { topic: "Board", contents: "frontend" },
    ],
    backend: [
      { topic: "초기설정", contents: "backend" },
      { topic: "Router setting", contents: "backend" },
      { topic: "DB구상", contents: "backend" },
      { topic: "DB구현", contents: "backend" },
      { topic: "상세기능 구현", contents: "backend" },
      { topic: "배포환경설정", contents: "backend" },
    ],
  },
});

export const newBoardState = atom<string | null>({
  key: "new",
  default: null,
});
