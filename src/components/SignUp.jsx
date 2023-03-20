import React from "react";
import { useState } from "react";
import { ReactComponent as Mail } from "../media/mail.svg";
import { ReactComponent as Lock } from "../media/lock.svg";
import { ReactComponent as Asterisk } from "../media/asterisk.svg";
import { ReactComponent as OpenEye } from "../media/openEye.svg";
import { ReactComponent as ClosedEye } from "../media/closedEye.svg";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [error, setError] = useState("");
  const [view, setView] = useState("hide");

  const navigate = useNavigate();

  const reset = () => {
    setError(null);
  };

  function submit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (name && surname && email && password) {
      setError(null);

      fetch(`${import.meta.env.VITE_APP_API_LINK}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      })
        .then((response) => {
          if (response.status === 409) {
            setError("Email already exist");
          } else if (response.status === 204) {
            setError("User registered succesfully");
            setTimeout(() => {
              navigate("../login");
            }, 2000);
          }
          return response;
        })
        .then((response) => console.log(response))
        .catch((error) => {
          if (error.message != "409") {
            console.error("Error:", error);
          }
        });
    }
  }

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
    <section className="loginContainer">
      <div className="mainBox">
        <div className="card">
          <div className="switchContainer">
            <Link to="../login" className="secondSelector">
              <span>Log In</span>
            </Link>
            <span className="currentSelector">Sign Up</span>
          </div>
          <div className="tittle">
            <span>Sign Up</span>
          </div>
          <form onSubmit={submit}>
            <div className="inputContainer">
              <div className="nameContainer">
                <input
                  type="text"
                  placeholder="Name"
                  className="name"
                  id="name"
                  required
                />
                <Asterisk className="svg asteriskIcon" />
                <input
                  type="text"
                  placeholder="Surname"
                  className="surName"
                  id="surname"
                  required
                />
              </div>
              <div className="emailContainer">
                <input
                  type="email"
                  className={!error ? "" : "emailError"}
                  placeholder="Email"
                  id="email"
                  required
                  onClick={reset}
                />
                <Mail className="svg emailIcon" />
                <Asterisk className="svg asteriskIcon" />
              </div>
              <div className="passWordContainer">
                <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  id="password"
                  required
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
                  value={"Sign Up"}
                />
              </div>
            </div>
          </form>
          {error ? <div className="errorMessage">{error}</div> : ""}
        </div>
      </div>
    </section>
  );
}
