import React,{useEffect} from "react";
import M from "materialize-css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import {
 
  Link,
  Outlet,
  useParams,
  useNavigate
} from 'react-router-dom';

const MentorNav = () => {

   const navigate = useNavigate();

  const params=useParams();

  const logOut = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/signout`
      );

      if (response) {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("Email");
        const notify = () =>
          toast.success(`${response.data.message}`, { theme: "colored" });
        notify();
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        const notify = () =>
          toast.error(`Network Error....`, { theme: "colored" });
        notify();
      }
    } catch (error) {
      console.log("Error...", error);
    }
  };

 useEffect(() => {
   let elems = document.querySelectorAll(".dropdown-trigger");
   M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
 }, []);

  return (
    <div>
      <div className="navbar-fixed" style={{ marginBottom: "15px" }}>
        <nav>
          <div className="nav-wrapper" style={{ backgroundColor: "#95686a" }}>
            <a
              href="#!"
              className="brand-logo"
              style={{ textDecoration: "none" }}
            >
              <i className="material-icons">laptop_mac</i>Zen Class
            </a>
            <ul className="right">
              <li>
                <a
                  className="dropdown-trigger btn-floating "
                  href="#!"
                  data-target="dropdown1"
                >
                  <i className="Medium material-icons">person</i>
                </a>
                <ul id="dropdown1" className="dropdown-content">
                  <li>
                    <div className="text-center">
                      <i className="Medium material-icons">person</i>
                      <h4 className="text-capitalize">
                        
                        {localStorage.getItem("firstName")}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <Link to={`/mentor/${params.id}/profile`}>Profile</Link>
                  </li>

                  <li className="divider"></li>
                  <li>
                    <span onClick={logOut} >Log Out</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-fluid ">
        <ToastContainer hideProgressBar={true} />
        <Outlet />
      </div>
    </div>
  );
};

export default MentorNav;

