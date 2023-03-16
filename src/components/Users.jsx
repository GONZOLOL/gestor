import { useEffect, useState } from "react";
import { ReactComponent as Exit } from "../media/exit.svg";
import { Link } from "react-router-dom";
import { getLocalStorageToken } from "./LocalStorage";
import { updateLocalStorageId } from "./LocalStorage";
import { ReactComponent as Trash } from "../media/trash.svg";
import { ReactComponent as EditUser } from "../media/editUser.svg";

export function Users() {
  const [data, setData] = useState(null);

  useEffect(() => {
    saveId();

    const token = getLocalStorageToken("token");

    fetch("http://51.38.51.187:5050/api/v1/users", {
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
            <span>{data?.count}</span>
            <Link to="/users/logOut" className="exitSvg">
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
                          to=""
                          className="edit"
                          onClick={() => saveId(data.id)}
                        >
                          {<EditUser />}
                        </Link>
                        <Link
                          to=""
                          className="delete"
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
