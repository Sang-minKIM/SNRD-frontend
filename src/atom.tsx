import { atom } from "recoil";
import { addDays } from "date-fns";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export interface ICategory {
  id: number;
  categoryIndex: number;
  category: string;
  topic: string;
  contents: string;
  comment_list: any;
}

export interface ICategoryState {
  [key: string]: ICategory[];
}

export const categoryState = atom<ICategoryState>({
  key: "category",
  default: {
    PM: [],
    Design: [],
    Frontend: [],
    Backend: [],
  },
});

// interface ITodo {
//   id: number;
//   text: string;
// }

export interface IToDo {
  id: number;
  state_index: number;
  category: string;
  topic: string;
  comment_list: any;
  state: string;
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

export const activeState = atom({
  key: "active",
  default: "0",
});

export interface IDate {
  startDate?: Date;
  endDate?: Date;
  key?: string;
}

export const dateState = atom<IDate[]>({
  key: "date",
  default: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ],
});

export const userIdState = atom({
  key: "userId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const emailState = atom({
  key: "email",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
  key: "loginToken",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
