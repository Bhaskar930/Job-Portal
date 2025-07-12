import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJob";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

// const skills=["HTML","CSS","JS","ReactJs"]

const Profile = () => {
  const [open, setOpen] = useState(false);
  const hasResume = true;
  const user = useSelector((store) => store.auth.user);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                className="h-24 w-24"
                src="data:image/png;base64,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"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
            <div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="text-right"
                variant="outline"
              >
                <Pen />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phone}</span>
          </div>
        </div>
        <div>
          <h1 className="font-medium">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length == 0
              ? "Not Mentioned"
              : user?.profile?.skills.map((Item, index) => (
                  <Badge className="mr-2 mt-1" key={index}>
                    {Item}
                  </Badge>
                ))}
          </div>
          <div className="flex w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">
              {user?.profile?.resumeOrignalName}
            </Label>
            {user?.profile?.resume ? (
              <a
                href={`https://res.cloudinary.com/dwjno0uxx/raw/upload/fl_attachment:false/fl_inline:true/v1752335550/resumes/abc.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Resume
              </a>
            ) : (
              <span>Not Applicable</span>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl"></div>
        <h1 className="font-bold my-5 text-lg">Applied Jobs</h1>
        <AppliedJob />
      </div>
      <div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
