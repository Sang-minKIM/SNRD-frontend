import { atom } from "recoil";

export const infoState = atom({
  key: "information",
  default: {
    name: "수나롭다",
    member: "김상민, 안영훈, 이예린, 이진형",
  },
});
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

export const categoryState = atom<ICategoryState>({
  key: "category",
  default: {
    plan: [],
    design: [],
    frontend: [],
    backend: [],
  },
});

// interface ITodo {
//   id: number;
//   text: string;
// }

export interface IToDo {
  id: number;
  categoryIndex: number;
  part: string;
  topic: string;
  contents: string;
  commentCounts: number;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "boards",
  default: {
    todo: [],
    doing: [],
    review: [],
    done: [],
  },
});

export const newCardState = atom<string | null>({
  key: "new",
  default: null,
});
