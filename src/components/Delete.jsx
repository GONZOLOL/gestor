import { Link, useNavigate } from "react-router-dom";
import { getLocalStorageId } from "../utils/LocalStorage";
import { getLocalStorageToken } from "../utils/LocalStorage";
import { useEffect, useState } from "react";

export function Delete() {
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(null);

  const id = getLocalStorageId();
  const navigate = useNavigate();

  const deleteUser = () => {
    fetch(`http://51.38.51.187:5050/api/v1/users/${id}`, {
      headers: { Authorization: `Bearer ${getLocalStorageToken()}` },
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          setDeleted("User deleted successfully");
          setTimeout(() => {
            navigate("/users");
          }, 3000);
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
    console.log("getLocalStorageId", getLocalStorageId());
  };

  return (
    <section className="userPageContainer">
      <div className="mainBox">
        <div className="card">
          <div>
            <span className="delete">
              Are you sure that you <br /> want to delete user{" "}
              {getLocalStorageId}?
            </span>
            <div className="selection">
              <div className="mainButton" onClick={deleteUser}>
                <span>Delete</span>
              </div>
              <div className="secondaryButton">
                <Link to="/users" className="secondSelector">
                  <span>Cancel</span>
                </Link>
              </div>
            </div>
            {error && <span className="errorUser">{error}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
