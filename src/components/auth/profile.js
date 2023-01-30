import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {

  const params = useParams();

 

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
   
    firstName:"",
    lastName:"" ,
    email:"",
    phoneNumber: "",
  });



 

  useEffect(() => {
    if(params.id){
      const getProfile = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/user/${params.id}`
          );
          if (response) {
            return setInitialValues(response.data.user);
          } else {
            const notify = () =>
              toast.error(`Network Error....`, { theme: "colored" });
            notify();
          }
        } catch (error) {
          if (error) {
            const notify = () =>
              toast.error(`User Doesn't Exist...or`, { theme: "colored" });
            notify();
          }
        }
      };
       getProfile();
    }
  },[params]);

  



  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "It's too short").required("Required"),
    lastName: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phoneNumber: Yup.number()
      .typeError("Enter valid Phone Number")
      .required("Required"),
    
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/${params.id}`,
        values
      );

      if (response) {
        const notify = () =>
          toast.success(`${response.data.message}`, { theme: "colored" });
        notify();
       navigate(-1);
      } else {
       const notify = () =>
         toast.error(`Network Error....`, { theme: "colored" });
       notify();
      }

      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 2000);
    } catch (error) {
      if (error) {
         const notify = () =>
           toast.error(`User Doesn't Exist...or`, { theme: "colored" });
         notify();
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 2000);
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="row">
        <div className="row">
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
          <h5 className="text-center">Profile</h5>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "center",
              alignContent: "center",
            }}
          >
           

            <div className="col s8 ">
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
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <span className="helper-text red-text">
                    {formik.errors.phoneNumber}
                  </span>
                )}
              </div>

              <div className="col s12 text-end">
                <button
                  type="submit"
                  onSubmit={formik.handleSubmit}
                  className="modal-close btn waves-effect waves-green"
                >
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
