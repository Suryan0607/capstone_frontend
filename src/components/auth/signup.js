import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link , useNavigate } from "react-router-dom";
import M from "materialize-css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import axios from "axios";



export default function SignUp() {

  useEffect(() => {
    const select = document.querySelector("select");
    M.FormSelect.init(select);
  }, []);

 

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "It's too short").required("Required"),
    lastName: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phoneNumber: Yup.number()
      .typeError("Enter valid Phone Number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    role: Yup.string(),
    remember: Yup.boolean().oneOf([true], "Remember Me").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "student",
      remember: false,
    },

    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
       

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/signup`,
          values
        );

        if (response) {
          const notify = () =>
            toast.success(`${response.data.message}`, { theme: "colored" });
          notify();
          navigate("/signin");
        } else {
          const notify = () =>
            toast.error(`Connection lost...`, { theme: "colored" });
          notify();
        }
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 2000);
      } catch (error) {
        alert(error.data.message);
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 2000);
      }
    },
  });

  

  return (
    <>
      <div className=" container-fluid">
        <div className="row">
          <div className="right col-sm-6">
            <div style={{ margin: "15px" }}>
              <h4 className="text-center">
                <i className="small material-icons ">lock_person</i>
                <br />
                Sign In
              </h4>
            </div>
            <div>
              <div>
                <form className="col s12" onSubmit={formik.handleSubmit}>
                  <div className="input-field col s6">
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="firstName"
                      className={
                        formik.errors.firstName && formik.touched.firstName
                          ? "active"
                          : "active"
                      }
                    >
                      First Name
                    </label>
                    {formik.errors.firstName && formik.touched.firstName && (
                      <span className="helper-text red-text">
                        {formik.errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="input-field col s6 ">
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="lastName"
                      className={
                        formik.errors.lastName && formik.touched.lastName
                          ? "active"
                          : "active"
                      }
                    >
                      Last Name
                    </label>
                    {formik.errors.lastName && formik.touched.lastName && (
                      <span className="helper-text red-text">
                        {formik.errors.lastName}
                      </span>
                    )}
                  </div>
                  <div className="input-field col s12 ">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="email"
                      className={
                        formik.errors.email && formik.touched.email
                          ? "active"
                          : "active"
                      }
                    >
                      Email
                    </label>
                    {formik.errors.email && formik.touched.email && (
                      <span className="helper-text red-text">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  <div className="input-field col s12 ">
                    <input
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="phoneNumber"
                      className={
                        formik.errors.phoneNumber && formik.touched.phoneNumber
                          ? "active"
                          : "active"
                      }
                    >
                      Phone Number
                    </label>
                    {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber && (
                        <span className="helper-text red-text">
                          {formik.errors.phoneNumber}
                        </span>
                      )}
                  </div>

                  <div className="input-field col s6">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="password"
                      className={
                        formik.errors.password && formik.touched.password
                          ? "active"
                          : "active"
                      }
                    >
                      Password
                    </label>
                    {formik.errors.password && formik.touched.password && (
                      <span className="helper-text red-text">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>

                  <div className="input-field col s6">
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className={
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                          ? "active"
                          : "active"
                      }
                    >
                      Confirm Password
                    </label>
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <span className="helper-text red-text">
                          {formik.errors.confirmPassword}
                        </span>
                      )}
                  </div>
                  <div className="input-field col s6">
                    <select
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value={"student"}>Student</option>
                      <option value={"mentor"}>Mentor</option>
                    </select>
                    <label
                      className={
                        formik.errors.status && formik.touched.status
                          ? "active"
                          : ""
                      }
                    >
                      Role
                    </label>
                    {formik.errors.status && formik.touched.status && (
                      <span className="helper-text red-text">
                        {formik.errors.status}
                      </span>
                    )}
                  </div>
                  <div className="input-field col s6">
                    <label>
                      <input
                        type="checkbox"
                        name="remember"
                        onChange={formik.handleChange}
                        checked={formik.values.remember}
                      />
                      <span>Filled in</span>
                      {formik.errors.remember && formik.touched.remember && (
                        <span className="helper-text red-text">
                          {formik.errors.remember}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="col s6 offset-s6 text-center">
                    <button
                      className="submit teal lighten-2 white-text btn "
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="col s12">
                    <p>
                      Don't have an account ? <Link to="/signin">Sign In</Link>
                    </p>
                  </div>

                  <br />
                  <br />
                </form>
              </div>
            </div>
          </div>
          <div
            className="left col-sm-6"
            style={{
              height: "97vh",
              backgroundImage:
                "url(https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
