import { ICategoryState, IToDoState } from "./atom";

const BASE_URL = "http://localhost:4000";

export function getCategories() {
  return fetch(`${BASE_URL}/category`).then((response) => response.json());
}

export function putCategories(newCategories: ICategoryState) {
  console.log(newCategories);
  return fetch(`${BASE_URL}/category`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategories),
  }).then((response) => response.json());
}

export function getTasks() {
  return fetch(`${BASE_URL}/task`).then((response) => response.json());
}
export function putTasks(newTask: IToDoState) {
  console.log(newTask);
  return fetch(`${BASE_URL}/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
}

export interface IContents {
  id?: number;
  categoryIndex?: number;
  part?: string;
  topic?: string;
  contents?: any;
  commentCounts?: number;
}
export interface IContentsProp {
  contentId?: string;
  posting?: IContents;
}
export function getContents(contentId: string | undefined) {
  return fetch(`${BASE_URL}/result/${contentId}`).then((response) =>
    response.json()
  );
}
export function postContents({ contentId, posting }: IContentsProp) {
  return fetch(`${BASE_URL}/result/${contentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posting),
  }).then((response) => response.json());
}
