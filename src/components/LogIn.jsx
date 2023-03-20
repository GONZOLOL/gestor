import React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as Mail } from "../media/mail.svg";
import { ReactComponent as Lock } from "../media/lock.svg";
import { ReactComponent as Asterisk } from "../media/asterisk.svg";
import { ReactComponent as OpenEye } from "../media/openEye.svg";
import { ReactComponent as ClosedEye } from "../media/closedEye.svg";
import { Link, useNavigate } from "react-router-dom";
import { updateLocalStorageToken } from "../utils/LocalStorage";

export const LogIn = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [view, setView] = useState("hide");

  const navigate = useNavigate();

  const reset = () => {
    setError(null);
  };

  function submit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email && password) {
      setError(null);

      fetch(`${import.meta.env.VITE_APP_API_LINK}/auth/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.status === 404) {
            throw new Error("404");
          } else if (response.status === 601) {
            throw new Error("601");
          }
          return response;
        })
        .then((data) => data.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          if (error.message === "404") {
            setError("Invalid email or password");
          } else if (error.message === "601") {
            setError("User is not validated");
          } else {
            console.error("Error:", error);
          }
        });
    } else {
      setError("Can't be empty");
    }
  }

  useEffect(() => {
    if (data?.accessToken) {
      updateLocalStorageToken(data.accessToken);
      navigate("/users");
    }
  }, [data]);

  const hidePassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      setView("notHide");
    } else {
      x.type = "password";
      setView("hide");
    }
  };

  return (
    <>
      <section className="loginContainer">
        <div className="mainBox">
          <div className="card">
            <div className="switchContainer">
              <span className="currentSelector">Log In</span>
              <Link to="../signup" className="secondSelector">
                <span>Sign Up</span>
              </Link>
            </div>
            <div className="tittle">
              <span>Log In</span>
            </div>
            <form className="form" onSubmit={submit}>
              <div className="inputContainer">
                <div className="emailContainer">
                  <input
                    type="email"
                    className={!error ? "email" : "emailError"}
                    placeholder="Email"
                    id="email"
                    onClick={reset}
                  />
                  <Mail className="svg emailIcon" />
                  <Asterisk className="svg asteriskIcon" />
                </div>
                <div className="passWordContainer">
                  <input
                    type="password"
                    className={!error ? "password" : "passwordError"}
                    placeholder="Password"
                    id="password"
                    onClick={reset}
                  />
                  <Lock className="svg lockIcon" />
                  <Asterisk className="svg asteriskIcon" />
                </div>
                <div className="showPassword">
                  {view == "hide" ? (
                    <>
                      <span className="showText">Show Password</span>
                      <ClosedEye onClick={hidePassword} />
                    </>
                  ) : view == "notHide" ? (
                    <>
                      <span className="showText">Hide Password</span>
                      <OpenEye onClick={hidePassword} />
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="submit">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>

                  <input
                    type="submit"
                    className="submitButton"
                    value={"Log In"}
                    id="submit"
                  />
                </div>
                {error && <div className="errorMessage">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
