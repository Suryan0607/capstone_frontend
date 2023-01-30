import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  useParams } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({data,status,getQuery}) => {

  const params = useParams();



   const [initialValues, setInitialValues] = useState({

     _id: "",
     solution: "",
     assignedTo: "",
     status: "",

   });

  useEffect(()=>{
    getProfile()
  },[])



const getProfile = () => {

  try {

    const name =
      `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`;
    if(name){
      return setInitialValues({
        assignedTo: name,
      });
    } else {
     const notify = () =>
       toast.error(`Network Error..Please Enter Your Name ..`, { theme: "colored" });
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


  
 

 

  useEffect(() => {
     const select = document.querySelector("select");
     M.FormSelect.init(select);
  }, []);
 

  const validationSchema = Yup.object().shape({
    solution: Yup.string().min(10).required("Required"),
    assignedTo: Yup.string().min(5, "It's Too Short").required("Required"),
    status: Yup.string().min(8, "Please Select Resolved").required("Required"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values)
      

     
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/mentor/${params.studentId}/${data._id}/updateQuery`,
        values
      );

       if (response) {
       const notify = () =>
         toast.success(`${response.data.message}`, { theme: "colored" });
       notify();
        getQuery(data._id)
        status(true)
       
        
       }else{
        const notify = () =>
          toast.error(`Network Error....`, { theme: "colored" });
        notify();
       }
      
      setTimeout(() => {
        resetForm();
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
        <div className="col s12">
          <div className="card #004d40 teal darken-4">
            <div className="card-content white-text">
              <span className="card-title text-center text-capitalize">
                {data.title}
              </span>
              <hr></hr>
              <div className="row ">
                <h6 className="card-subtitle">Description</h6>
              </div>

              <blockquote className="text-capitalize">
                {data.description}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <form onSubmit={formik.handleSubmit}>
          <div className="col s12">
            <div className="input-field col s12">
              <textarea
                id="textarea"
                type="text"
                name="solution"
                className="materialize-textarea"
                value={formik.values.solution}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              ></textarea>
              <label
                htmlFor="textarea"
                className={
                  formik.errors.solution && formik.touched.solution
                    ? "active"
                    : "active"
                }
              >
                Solution
              </label>
              {formik.errors.solution && formik.touched.solution && (
                <span className="helper-text red-text">
                  {formik.errors.solution}
                </span>
              )}
            </div>

            <div className="input-field col s6">
              <input
                type="text"
                name="assignedTo"
                value={formik.values.assignedTo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="assignedTo"
                className={
                  formik.errors.assignedTo && formik.touched.assignedTo
                    ? "active"
                    : "active"
                }
              >
                Your Name
              </label>
              {formik.errors.assignedTo && formik.touched.assignedTo && (
                <span className="helper-text red-text">
                  {formik.errors.assignedTo}
                </span>
              )}
            </div>

            <div className="input-field col s6">
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value={"bending"}>Bending</option>
                <option value={"resolved"}>Resolved</option>
              </select>
              <label
                className={
                  formik.errors.status && formik.touched.status ? "active" : ""
                }
              >
                Status
              </label>
              {formik.errors.status && formik.touched.status && (
                <span className="helper-text red-text">
                  {formik.errors.status}
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
        </form>
      </div>
    </>
  );
};

export default Form;
