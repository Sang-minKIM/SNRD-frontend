import { ICategoryState, IToDoState } from "./atom";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://port-0-backend-fyyf25lbprdhq4.gksl2.cloudtype.app";

export function getCategories(projectId: string | undefined) {
  return fetch(`${BASE_URL}/mainpage/${projectId}/`).then((response) =>
    response.json()
  );
}

export function putCategories({
  projectId,
  newCategories,
}: {
  projectId: string | undefined;
  newCategories: ICategoryState;
}) {
  return fetch(`${BASE_URL}/mainpage/${projectId}/change`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategories),
  }).then((response) => response.json());
}

export function getTasks(projectId: string | undefined) {
  return fetch(`${BASE_URL}/boardpage/${projectId}/`).then((response) =>
    response.json()
  );
}

export function putTasks({
  projectId,
  newTask,
}: {
  projectId: string | undefined;
  newTask: IToDoState;
}) {
  console.log(newTask);
  return fetch(`${BASE_URL}/boardpage/${projectId}/stateChange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
}

export interface IContentsProp {
  projectId?: string;
  id?: string;
  topic?: string;
  category?: string;
  contents?: string;
}

export function postContents({
  projectId,
  id,
  topic,
  category,
  contents,
}: IContentsProp) {
  return fetch(`${BASE_URL}/mainpage/${projectId}/${id}/editTopicContents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, topic, category, contents }),
  }).then((response) => response.json());
}

export function getUser(userId: string | undefined) {
  return fetch(`${BASE_URL}/profilepage/${userId}/`).then((response) =>
    response.json()
  );
}

export function getProfile(userId: string | undefined) {
  return fetch(`${BASE_URL}/profilepage/${userId}/`).then((response) =>
    response.json()
  );
}
export function postProfile({
  userId,
  name,
  information,
}: {
  userId: string | undefined;
  name: string | undefined;
  information?: string;
}) {
  return fetch(`${BASE_URL}/profilepage/${userId}/information`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, information }),
  }).then((response) => response.json());
}

export interface IInfo {
  title?: string;
  teammates: any;
  duration?: string;
  slogan?: string;
}

export interface IInfoProp {
  id?: string;
  posting?: IInfo;
}

export function putProjectInfo({ id, posting }: IInfoProp) {
  return fetch(`${BASE_URL}/mainpage/${id}/editProjectInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posting),
  }).then((response) => response.json());
}

export function addProject({ userId, posting }: any) {
  return fetch(`${BASE_URL}/profilepage/${userId}/create`, {
    method: "POST",
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

export function postLogout(email: string | undefined) {
  return fetch(`${BASE_URL}/accounts/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((response) => response.json());
}
