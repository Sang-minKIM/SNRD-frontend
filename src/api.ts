export function getCategories() {
  return fetch("http://localhost:4000/category").then((response) =>
    response.json()
  );
}
