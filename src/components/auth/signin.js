import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";



export default function SignIn({ setUser }) {
  const navigate = useNavigate();

 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
    remember: Yup.boolean().oneOf([true], "Remember Me").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
       
        
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/signin`,
          values
        );

        if (response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("firstName", response.data.user.firstName);
          localStorage.setItem("lastName", response.data.user.lastName);
          localStorage.setItem("Email", response.data.user.email);

          setUser(response.data);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
         
          

           const notify = () =>
          toast.success(
            ` hello ${response.data.user.firstName} ! Welcome My App ! `,
            { theme: "colored" }
          );
          notify();
         
          

          const role = response.data.user.role;
          const id = response.data.user._id;

         

          if (role === "mentor") {
           
            navigate(`/mentor/${id}`);
          } else {
            navigate(`/student/${id}`);
          }
        }

        setTimeout(() => {
          resetForm({ values: "" });
          setSubmitting(false);
        }, 2000);
      } catch (error) {
        if(error){
          const notify = () =>
            toast.error(`User Doesn't Exist...or`, { theme: "colored" });
          notify();
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 2000);
        }
         
      }
    },
  });

  

  return (
    <>
      <div className=" container-fluid">
        <div className="row">
          <div className="right col-sm-6">
            <div style={{margin:"15px"}}>
              <h4 className="text-center">
                <i className="small material-icons ">lock_person</i>
                <br />
                Sign In
              </h4>
            </div>
            <div>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="col s12">
                    <div className="input-field">
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

                    <div className="input-field">
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
                        Sign In
                      </button>
                    </div>

                    <br />
                    <br />

                    <p>
                      Don't have an account ? <Link to="/signup">Sign Up</Link>
                    </p>

                    <br />
                    <br />
                  </div>
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

