import { ReactComponent as Back } from "../media/back.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocalStorageToken } from "../utils/LocalStorage";
import { getLocalStorageId } from "../utils/LocalStorage";
import { ReactComponent as Trash } from "../media/trash.svg";
import { ReactComponent as EditUser } from "../media/editUser.svg";

export function ViewUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = getLocalStorageToken("token");

    fetch(`${import.meta.env.VITE_APP_API_LINK}/users/${getLocalStorageId()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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
          <div className="userContent">
            <div className="content">
              <div className="contentContainer">
                <span className="tag">Name</span>
                <span className="info">
                  {data.name ? data.name : "No data"}
                </span>
              </div>
              <div className="contentContainer">
                <span className="tag">Surname</span>
                <span className="info">
                  {data.surname ? data.surname : "No data"}
                </span>
              </div>
              <div className="contentContainer">
                <span className="tag">Mail</span>
                <span className="info">
                  {data.email ? data.email : "No data"}
                </span>
              </div>
            </div>
            <div className="iconButtons">
              <div className="editButton">
                <Link to="/users/editUser" className="editLink">
                  <span>Edit User</span>
                </Link>
                <EditUser />
              </div>
              <div className="deleteButton">
                <Link to="/users/delete" className="deleteLink">
                  <span>Delete</span>
                </Link>
                <Trash />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
