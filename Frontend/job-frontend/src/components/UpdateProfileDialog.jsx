import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice"; // ✅ Make sure this path is correct

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: user?.profile?.resume || null,
  });
  console.log("I am input",input);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      const skillsArray = value.split(",").map((skill) => skill.trim());
      setInput({ ...input, skills: skillsArray });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phone", input.phone);
    formdata.append("bio", input.bio);
    formdata.append("skills", JSON.stringify(input.skills));
    if (input.file) {
      formdata.append("file", input.file);
    }
    console.log("I am from Form",formdata);
    try {
      const res = await axios.put(`${USER_API_ENDPOINT}/updateprofile`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3 border-2 border-gray-300"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3 border-2 border-gray-300"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={input.phone}
                  onChange={changeEventHandler}
                  className="col-span-3 border-2 border-gray-300"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3 border-2 border-gray-300"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills.join(", ")} // ✅ convert array to string
                  onChange={changeEventHandler}
                  className="col-span-3 border-2 border-gray-300"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3 border-2 border-gray-300"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <Button type="submit" className="w-full mt-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
