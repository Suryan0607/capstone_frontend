import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams,useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import M from "materialize-css";

const AddQuery = () => {

  const params = useParams();

  const navigate = useNavigate();


  const [initialValues, setInitialValues] = useState({
    category: "Class Related",
    title: "",
    description: "",
  });

  useEffect(() => {
    const select = document.querySelector("select");
    M.FormSelect.init(select);
  }, []);

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    title: Yup.string().min(5, "It's Too Short").required("Required"),
    description: Yup.string().min(15, "It's Too Short").required("Required"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {

      setInitialValues(values)

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/student/${params.id}/addQuery`,
        values
      );

      if (response) {
        const notify = () =>
          toast.success(`*${response.data.message}*`, { theme: "colored" });
        notify();
        navigate(`/student/${params.id}`);
        
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
          <h5 className="text-center">Create Query</h5>
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
              <div className="row">
                <h6>Topic</h6>
              </div>
              <div className="input-field col s12">
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value={"Class Related"}>Class Related</option>
                  <option value={"Placement Related"}>Placement Related</option>
                  <option value={"Task Related"}>Task Related</option>
                  <option value={"Other..."}>Other...</option>
                </select>
                <label
                  className={
                    formik.errors.category && formik.touched.category
                      ? "active"
                      : ""
                  }
                >
                  Category
                </label>
                {formik.errors.category && formik.touched.category && (
                  <span className="helper-text red-text">
                    {formik.errors.category}
                  </span>
                )}
              </div>

              <div className="row">
                <h6>Details</h6>
              </div>

              <div className="input-field col s12">
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="title"
                  className={
                    formik.errors.title && formik.touched.title ? "active" : ""
                  }
                >
                  Title
                </label>
                {formik.errors.title && formik.touched.title && (
                  <span className="helper-text red-text">
                    {formik.errors.title}
                  </span>
                )}
              </div>
              <div className="input-field col s12">
                <textarea
                  id="textarea"
                  type="text"
                  name="description"
                  className="materialize-textarea"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                ></textarea>
                <label
                  htmlFor="textarea"
                  className={
                    formik.errors.description && formik.touched.description
                      ? "active"
                      : ""
                  }
                >
                  Description
                </label>
                {formik.errors.description && formik.touched.description && (
                  <span className="helper-text red-text">
                    {formik.errors.description}
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

export default AddQuery;
