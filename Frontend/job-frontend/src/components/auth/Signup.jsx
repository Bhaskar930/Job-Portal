import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const{loading}=useSelector(store=>store.auth)
  const dispatch=useDispatch();
    const navigate=useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("fullname",input.fullname);
    formdata.append("email",input.email);
    formdata.append("password",input.password);
    formdata.append("phone",input.phone);
    formdata.append("role",input.role);
    if(input.file){
        formdata.append("file",input.file);
    }
    try{
      dispatch(setLoading(true));
        const res=await axios.post(`${USER_API_ENDPOINT}/register`,formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        if(res.data.success){
            navigate('/login')
            toast.success(res.data.message)
        }

    }catch(error){
        console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center max-w-7xl mx-auto justify-center">
        <form
          onSubmit={submithandler}
          className="w-1/2 border-gray-300 rounded-md p-4 my-20 justify-center"
        >
          <h1 className="font-bold text-xl mb-5 flex justify-center">Signup</h1>

          <Label className="mb-1">Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Bhaskar"
          />

          <Label className="mb-1">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="negibhaskar19@gmail.com"
          />

          <Label className="mb-1">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="12Bhasd@"
          />

          <Label className="mb-1">Phone</Label>
          <Input
            type="number"
            name="phone"
            value={input.phone}
            onChange={changeEventHandler}
            placeholder="1234567891"
          />

          <div className="flex items-center mt-5">
            <RadioGroup className="flex">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Label className="mb-1">Profile</Label>
          <Input
            accept="image/*"
            type="file"
            name="file"
            onChange={changeFileHandler}
          />

           {
            loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button>:<Button type="submit" className="w-full mt-4">
            Signup
          </Button>

          }

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
