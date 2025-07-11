import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
    const isApplied=false;

  return (
    <div>
    <div className="flex justify-between">
      <div>
        <h1 className=" max-w-7xl font-bold text-xl mx-auto">Frontend Developer</h1>
        <div className="flex items-center gap-2 mt-4 ">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            12 Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            Part Time
          </Badge>
          <Badge className="text-[#7209B7] font-bold" variant="ghost">
            24 LPA
          </Badge>
        </div>
      </div>
      <div>
        {
            
        }
        <Button disabled={isApplied} className={`rounded-lg 00 cursor-pointer'}`}>
            {isApplied? 'Already Applied':'Apply Now'}</Button>
      </div>

      
    </div>
    <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Desciption</h1>
    <div className="my-4">
        <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">Frontend Develoepr</span></h1>
        <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">Hyderabad</span></h1>
        <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, blanditiis. Aperiam molestias doloremque amet in maxime adipisci accusamus tempore eos!</span></h1>
        <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">2years</span></h1>
        <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">12 LPA</span></h1>
        <h1 className="font-bold my-1">Total-Applicants:<span className="pl-4 font-normal text-gray-800">4</span></h1>
        <h1 className="font-bold my-1">Date Posted:<span className="pl-4 font-normal text-gray-800">12-07-2025</span></h1>
    </div>
    </div>
  );
};

export default JobDescription;
