import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import Card from "./card"


//  Query  Card

const StuDashBoard = () => {

  const params = useParams();

  const navigate = useNavigate();

  const [Data, setData] = useState([]); 

 let [queryId, setQueryId] = useState("");

 const [queryData, setQueryData] = useState({});

  

  useEffect(() => {
    if(params.id){
    const studentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/student/${params.id}/allQuery`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    studentData()
  }
  }, [params]);

  

  
  const getQuery = async (id) => {

    try {

      setQueryId(id);
      
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/student/${params.id}/${id}/oneQuery`
      );

      if (response.data.status === "bending") {
        
        setQueryData(response.data);
      } else {
       
        setQueryData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataQ = Data.map((data, index) => (
    <DataSet getQuery={getQuery} data={data} key={index}></DataSet>
  ));



  return (
    <>
      <div className="row">
        {Data.length === 0 ? (
          <>
            <div className="row">
              <div className="col s12 text-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    navigate(`/student/${params.id}/addquery`)
                  }
                >
                  Create Query
                </button>
              </div>
              <div className="row">
                <div className="col s12 ">
                  <h5>No Query's</h5>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="row "
              style={{
                margin: "0px",
              }}
            >
              <div
                className="col s12 "
                style={{
                  marginBottom: "5px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    navigate(`/student/${params.id}/addquery`)
                  }
                >
                  Create Query
                </button>
              </div>
            </div>
            <div
              className="col-6 "
              style={{
                height: "78vh",
                overflowY: "scroll",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {dataQ}
            </div>
            <div className="col-6 ">
              {queryId === "" ? (
                <>
                  <div className="row">
                    <h5 className="text-center">Query</h5>
                  </div>
                </>
              ) : (
                <>
                  <Card data={queryData} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};



export default StuDashBoard;

const DataSet = ({ data, getQuery }) => {
  if (!data)
    return (
      <>
        <h5>Querys's Not Assigned</h5>
      </>
    );
 
  return (
    <>
      {/* card */}

      <div
        className="row"
        style={{
          width: "100%",

          marginBottom: "0px",
        }}
      >
        <div className="col s12 m6">
          <div className="card  blue-grey darken-1 ">
            <div className="col">
              <div
                className="card-content white-text col s6"
                style={{
                  padding: "15px",
                }}
              >
                <h6 className=" text-uppercase">
                  {`Query`} - {data.title}
                </h6>
                <div className="row">
                  <h6 className="card-subtitle" style={{ display: "inline" }}>
                    {data.category}
                  </h6>
                </div>

                <div>
                  <blockquote
                    className="text-uppercase"
                    style={{ display: "inline" }}
                  >
                    {data.status}
                  </blockquote>
                </div>
              </div>

              <div
                className="card-content white-text col s6"
                style={{
                  padding: "15px",
                }}
              >
                <p>Created At</p>
                <p>
                  {moment(data.createdAt).utc().format("MM-DD-YY, h:mm:ss a")}
                </p>
                <hr></hr>
                <div>
                  <button
                    className="waves-effect waves-light btn #eceff1 blue-grey lighten-5"
                    onClick={() => getQuery(data._id)}
                  >
                    Details
                  </button>
                  <i className="small material-icons">short_text</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
