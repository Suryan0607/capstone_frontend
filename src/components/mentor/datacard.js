import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StuDataCard = () => {
  
  

   const [Data, setData] = useState([]);
   
  

   const studentData = async () => {
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_BASE_URL}/mentor/allQuery`
       );
       setData(response.data);
     } catch (error) {
       console.log(error);
     }
   };

    useEffect(() => {
      studentData();
    }, []);

 const dataQ = Data.map((data, index) => (
  <DataSet data={data} key={index}></DataSet>
));
  
 return (
   <>
     <div className="col text-center">
       <h5 >Students Detail</h5>
     </div>
     <div
       className="row"
       style={{
         alignItems: "flex-start",
         justifyContent: "center",
       }}
     >
       {dataQ}
     </div>
   </>
 );
};

export default StuDataCard;





const DataSet = ({data}) => {

  const navigate=useNavigate();

  const handler = (e) => {

    e.preventDefault();

    let studentId=e.target.id

    if(!studentId){

      return<></>

    }

    else{

      navigate(`query/${studentId}`)

    }
  }
  
  if(!data) return (
    <>
      <h5>No Student...</h5>
    </>
  );

  return (
    <div
      className="row"
      style={{
        width: "50%",
        marginBottom: "0px",
      }}
    >
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="col">
            <div
              className="card-content white-text col s6"
              style={{
                padding: "15px",
              }}
            >
              <span className=" text-uppercase">
                <h6>{data.name}`</h6>
              </span>
              <hr></hr>
              <p className="text-capitalize">{`Email : ${data.email}`}</p>
              <p className="text-capitalize">{`Mobile No : ${data.phoneNumber}`}</p>
              <p>{`Total Query : ${data.query}`}</p>
            </div>

            <div
              className="card-content white-text col s6"
              style={{
                padding: "15px",
              }}
            >
              <span className="card-title">
                <h6> Query's Details</h6>
              </span>

              <p>
                Resolved Query's:
                <p>{data.resolvedQuery}</p>
              </p>

              <p>
                Bending Query's:
                <span>
                  <p>{data.bendingQuery}</p>
                </span>
              </p>
            </div>
          </div>

          <div
            className="card-action col s12"
            style={{
              display: "flex",
              padding: "5px",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="waves-effect #004d40 teal darken-4 white-text waves-teal btn-flat"
              id={data._id}
              onClick={handler}
            >
              Go To Query's
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

