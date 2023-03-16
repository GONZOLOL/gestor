export function getLocalStorageToken() {
  if (localStorage.getItem("token") != "") {
    return localStorage.getItem("token");
  } else return null;
}

export function updateLocalStorageToken(token) {
  localStorage.setItem("token", token);
}
