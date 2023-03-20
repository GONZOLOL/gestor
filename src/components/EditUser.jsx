import { ReactComponent as Back } from "../media/back.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorageToken } from "../utils/LocalStorage";
import { getLocalStorageId } from "../utils/LocalStorage";
import { ReactComponent as Save } from "../media/save.svg";
import { ReactComponent as Cross } from "../media/cross.svg";

export function EditUser() {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const id = getLocalStorageId();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorageToken("token");

    fetch(`${import.meta.env.VITE_APP_API_LINK}/users/${getLocalStorageId()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, [id, getLocalStorageToken]);

  function submit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (name && surname && email && password) {
      fetch(`${import.meta.env.VITE_APP_API_LINK}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${getLocalStorageToken()}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ name, surname, email, password }),
      })
        .then((response) => {
          if (response.status === 200) {
            setError("User edited successfully");
            setTimeout(() => {
              navigate("/users");
            }, 1500);
          } else if (response.status === 404) {
            throw new Error("404");
          }
          return response;
        })
        .catch((error) => {
          if (error.message === "404") {
            setError("User not found");
          } else {
            console.error("Error:", error);
          }
        });
    }
  }

  return (
    <section className="mainBox">
      <div className="innerBox">
        <div className="viewUserContainer">
          <div className="top">
            <Link to="/users" className="back">
              <Back />
            </Link>
            <span className="tittle">{data.name}</span>
          </div>
          <form onSubmit={submit} className="userContent">
            <div className="content">
              <div className="contentContainer">
                <span className="tag">Name</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={data ? data.name : "No data"}
                  required
                  id="name"
                />
              </div>
              <div className="contentContainer">
                <span className="tag">Surname</span>
                <input
                  type="tex"
                  className="info"
                  defaultValue={data ? data.surname : "No data"}
                  required
                  id="surname"
                />
              </div>
              <div className="contentContainer">
                <span className="tag">Mail</span>
                <input
                  type="email"
                  className="info"
                  defaultValue={data ? data.email : "No data"}
                  required
                  id="email"
                />
              </div>
              <div className="contentContainer">
                <span className="tag">Password</span>
                <input
                  type="text"
                  className="info"
                  placeholder="Update your password"
                  required
                  id="password"
                />
              </div>
            </div>
            <div className="iconButtons">
              <div className="saveButton">
                <button type="Submit">Save</button>
                <Save />
              </div>
              <div className="cancelButton">
                <Link to="/users" className="deleteLink">
                  <span>Cancel</span>
                  <Cross />
                </Link>
              </div>
            </div>
          </form>
          {error ? <div className="errorMessage">{error}</div> : ""}
        </div>
      </div>
    </section>
  );
}
