export function getLocalStorageToken() {
  if (localStorage.getItem("token") != "") {
    return localStorage.getItem("token");
  } else return null;
}

export function updateLocalStorageToken(token) {
  localStorage.setItem("token", token);
}

export function getLocalStorageId() {
  return localStorage.getItem("id");
}

export function updateLocalStorageId(id) {
  localStorage.setItem("id", id);
}
