import React from "react";
import Navbar from "./shared/Navbar";
import FilterJobs from "./FilterJobs";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />

      {/* <Job /> */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterJobs />
          </div>

          {jobsArray.length <= 0 ? (
            <Span>Job Not Found</Span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
               { jobsArray.map((items, index)=>(
                <div key={index}>
                  <Job />
                </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
