import { Link } from "react-router-dom";

export function Delete() {

  
  return (
    <section className="userPageContainer">
      <div className="mainBox">
        <div className="card">
          <div>
            <span className="logOut">
              Are you sure that you <br /> want to log out?
            </span>
            <div className="buttonsContainer">
              <div className="mainButton">
                <Link to="../login" onClick={clearLocalStorage}>
                  <span>Log Out</span>
                </Link>
              </div>
              <div className="secondaryButton">
                <Link to="../users" className="secondSelector">
                  <span>Cancel</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
