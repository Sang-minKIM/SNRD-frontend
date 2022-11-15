import { atom } from "recoil";

export interface ICategory {
  id: number;
  categoryIndex: number;
  part: string;
  topic: string;
  contents: string;
  commentCounts: number;
}

export interface ICategoryState {
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
    기획: [],
    디자인: [],
    프론트엔드: [],
    백엔드: [],
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
    "해야 할 일": [],
    진행중: [],
    검토중: [],
    "완료!": [],
  },
});

export const newCardState = atom<string | null>({
  key: "new",
  default: null,
});
