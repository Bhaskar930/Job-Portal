import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

const Login = () => {
  const {loading}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
     
    const formdata=new FormData(); formdata.append("fullname",input.fullname);
    
   
   
    
    try{
        dispatch(setLoading(true));
        const res=await axios.post(`${USER_API_ENDPOINT}/login`,input,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        if(res.data.success){
            dispatch(setAuthUser(res.data.user))
            navigate('/')
            toast.success(res.data.msg)
        }

    }catch(error){
        console.log(error);
    }finally{
       dispatch(setLoading(false));
    }
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center max-w-7xl mx-auto justify-center">
        <form
          onSubmit={SubmitHandler}
          className="w-1/2 border-gray-300 rounded-md p-4 my-20 justify-center"
        >
          <h1 className="font-bold text-xl mb-5 flex justify-center">Login</h1>

          <div>
            <Label className="mb-1">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="negibhaskar19@gmail.com"
            />
          </div>

          <div>
            <Label className="mb-1">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="12Bhasd@"
            />
          </div>

          <div className="flex items-center">
            <RadioGroup className="flex mt-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button>:<Button type="submit" className="w-full mt-4">
            Login
          </Button>

          }

          
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
