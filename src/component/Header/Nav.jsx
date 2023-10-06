import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://images-platform.99static.com//Gz9su2y6lfEKJDkwAMRJ1oYDa7M=/303x224:2183x2101/fit-in/500x500/projects-files/79/7947/794710/16582d52-f8cd-4484-8f4a-130f3f1137a0.png"
      />
      {auth ? (
        <>
          <ul className="nav-ul">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add-product"> Add Products</Link>
            </li>

            <li>
              <Link onClick={logout} to="/login">
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="nav-ul nav-right">
            <li>
              <Link to="/signup"> SignUp</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Nav;
