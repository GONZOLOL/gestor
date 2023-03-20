import { useEffect, useState } from "react";
import { ReactComponent as Exit } from "../media/exit.svg";
import { Link } from "react-router-dom";
import { getLocalStorageToken } from "../utils/LocalStorage";
import { updateLocalStorageId } from "../utils/LocalStorage";
import { ReactComponent as Trash } from "../media/trash.svg";
import { ReactComponent as User } from "../media/user.svg";
import { ReactComponent as EditUser } from "../media/editUser.svg";

export function Users() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = getLocalStorageToken("token");

    fetch(`${import.meta.env.VITE_APP_API_LINK}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log("data", data);

  const saveId = (id) => {
    updateLocalStorageId(id);
  };

  return (
    <section className="userPageContainer">
      <div className="mainBox">
        <div className="card">
          <div className="header">
            <span>Registered Users</span>
            <div className="userCounter">
              <span>{data?.count}</span>
              <User className="person" />
            </div>
            <Link to="/users/logOut" className="exit">
              <Exit />
            </Link>
          </div>
          <div className="userList">
            {data &&
              data.items.map((data, i) => {
                return (
                  <div key={i}>
                    <div className="userContainer">
                      <div className="user">
                        <Link
                          to="/users/viewUser"
                          onClick={() => saveId(data.id)}
                        >
                          <span>{data.email}</span>
                        </Link>
                      </div>
                      <div className="icons">
                        <Link
                          to="/users/editUser"
                          className="editIcon"
                          onClick={() => saveId(data.id)}
                        >
                          {<EditUser />}
                        </Link>
                        <Link
                          to="/users/delete"
                          className="deleteIcon"
                          onClick={() => saveId(data.id)}
                        >
                          {<Trash />}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
