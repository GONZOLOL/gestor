import { ReactComponent as Back } from "../media/back.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorageToken } from "../utils/LocalStorage";
import { getLocalStorageId } from "../utils/LocalStorage";

export function EditUser() {
  const [data, setData] = useState([]);
  const id = getLocalStorageId();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorageToken("token");

    fetch(`http://51.38.51.187:5050/api/v1/users/${getLocalStorageId()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const sendEdit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (name && surname && email && password) {
      fetch(`http://51.38.51.187:5050/api/v1/users/${id}`, {
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
  };

  console.log(data.email);

  return (
    <section className="mainBox">
      <div className="innerBox">
        <div className="viewUserContainer">
          <div className="top">
            <Link to="/users" className="back">
              <Back />
            </Link>
            <span className="tittle">{data.name} Profile</span>
          </div>
          <form className="userContent" onSubmit={sendEdit}>
            <div className="content">
              <div className="contentContainer">
                <span className="tag">Name</span>
                <input
                  type="text"
                  className="info"
                  placeholder={data.name ? data.name : "No data"}
                />
              </div>
              <div className="contentContainer">
                <span className="tag">Surname</span>
                <input
                  type="text"
                  className="info"
                  placeholder={data.surname ? data.surname : "No data"}
                />
              </div>
              <div className="contentContainer">
                <span className="tag">Mail</span>
                <input
                  type="text"
                  className="info"
                  placeholder={data.email ? data.email : "No data"}
                />
              </div>
              <div className="contentContainer">
                <span className="tag">Password</span>
                <input
                  type="text"
                  className="info"
                  placeholder={data.password ? data.password : "No data"}
                />
              </div>
            </div>
            <div className="iconButtons">
              <div className="editButton" type="submit">
                <div>
                  <span>Save</span>
                </div>
              </div>
              <div className="deleteButton">
                <Link to="/users" className="deleteLink">
                  <span>Cancel</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
