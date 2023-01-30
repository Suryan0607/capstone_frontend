import { React } from "react";


const SolCard =({data})=>{
    
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
                <div className="col s12">
                  <blockquote className="text-capitalize">
                    {data.description}
                  </blockquote>
                </div>

                <div className="row">
                  <h6 className="card-subtitle">Solution</h6>
                </div>
                <div className="col s12">
                  <blockquote className="text-capitalize">
                    {data.solution}
                  </blockquote>
                </div>

              

                <div className="col s12 text-center text-capitalize">
                  <h6 className="card-subtitle mb-2  ">{`Assigned To - ${data.assignedTo}`}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SolCard