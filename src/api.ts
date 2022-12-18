import { ICategoryState, IToDoState } from "./atom";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://port-0-backend-fyyf25lbprdhq4.gksl2.cloudtype.app";

export function getCategories(projectId: string | undefined) {
  return fetch(`${BASE_URL}/mainpage/${projectId}/`).then((response) =>
    response.json()
  );
}

export function putCategories(newCategories: ICategoryState) {
  return fetch(`${BASE_URL}/category/`, {
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
  return fetch(`${BASE_URL}/task/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
}

export function getContents(contentId: string | undefined) {
  return fetch(`${BASE_URL}/result/${contentId}/`).then((response) =>
    response.json()
  );
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

export function postContents({ contentId, posting }: IContentsProp) {
  return fetch(`${BASE_URL}/result/${contentId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posting),
  }).then((response) => response.json());
}

export function getUser(userId: string | undefined) {
  return fetch(`${BASE_URL}/profilepage/${userId}/`).then((response) =>
    response.json()
  );
}

export function getProject(userId: number | undefined) {
  return fetch(`${BASE_URL}/profilepage/${userId}/`).then((response) =>
    response.json()
  );
}

export interface IInfo {
  id: number;
  title: string;
  teammates: string[];
  duration: string[];
  introduction: string;
}

export interface IInfoProp {
  id?: string;
  posting?: IInfo;
}

export function putProjectInfo({ id, posting }: IInfoProp) {
  return fetch(`${BASE_URL}/project/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posting),
  }).then((response) => response.json());
}

export interface IUserProp {
  email: string;
  password: string;
  name: string;
}

export function postJoin({ email, password, name }: IUserProp) {
  return fetch(`${BASE_URL}/accounts/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((response) => response.json());
}

interface ILoginProp {
  email: string;
  password: string;
}

export function postLogin({ email, password }: ILoginProp) {
  return fetch(`${BASE_URL}/accounts/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());
}
