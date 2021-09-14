import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
const Navbar = (props) => {
  let history = useHistory();
  let location = useLocation();
  const handleLogout = () => {
    props.showAlert("Successfully logged out!", "success");
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Keeper App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          {!localStorage.getItem("token") ? (
            <form className="form-inline my-2 my-lg-0">
              <Link
                to="/login"
                className="btn btn-secondary btn-dark mx-1 btn-sm "
                role="button"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-secondary mx-1 btn-dark btn-sm "
                role="button"
              >
                SignUp
              </Link>
            </form>
          ) : (
            <Link
              to="/"
              onClick={handleLogout}
              className="btn btn-primary mx-1 btn-dark btn-sm "
              role="button"
            >
              LOGOUT
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
