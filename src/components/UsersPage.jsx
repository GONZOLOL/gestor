import { useEffect, useState } from "react";
import { ReactComponent as Exit } from "../media/exit.svg";
import { Link } from "react-router-dom";
import { getLocalStorageToken } from "./LocalStorage";
import { ReactComponent as Trash } from "../media/trash.svg";
import { ReactComponent as EditUser } from "../media/editUser.svg";

export function UsersPage() {
  const [data, setData] = useState(null);
  const [authenticated, setauthenticated] = useState(null);

  useEffect(() => {
    const token = getLocalStorageToken("token");

    if (token) {
      setauthenticated(token);
    }

    fetch("http://51.38.51.187:5050/api/v1/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <section className="userPageContainer">
        <div className="mainBox">
          <div className="card">
            <div className="header">
              <span>Users Page</span>
              <Link to="../login" className="exitSvg">
                <Exit />
              </Link>
            </div>
            <div className="userList">
              {data &&
                data.items.map((data, i) => {
                  return (
                    <>
                      <div className="userContainer">
                        <div key={i} className="user">
                          <Link to>{data.email}</Link>
                        </div>
                        <div className="svg">
                          <EditUser />
                          <Trash />
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
