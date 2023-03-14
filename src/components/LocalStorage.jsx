export function getLocalStorage() {
  if (localStorage.getItem("token") != "") {
    return localStorage.getItem("token");
  } else return null
}

export function updateLocalStorage(token) {
  localStorage.setItem("token", token);
}
